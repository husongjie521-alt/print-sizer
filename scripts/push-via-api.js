// Fallback push that uses the GitHub REST Git Database API (api.github.com)
// when the normal smart-HTTP endpoint (github.com) is unreachable.
// Requires: authenticated gh CLI. Run: node scripts/push-via-api.js "commit message"
const { execFileSync } = require('child_process');

const repo = 'husongjie521-alt/print-sizer';
const branch = 'main';
const gh = 'C:\\Program Files\\GitHub CLI\\gh.exe';
const cwd = process.cwd();
const message = process.argv[2] || 'Update PrintSizer site';

function ghApi(args, payload) {
  const params = ['api', ...args];
  const opts = { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 };
  if (payload !== undefined) opts.input = JSON.stringify(payload);
  const out = execFileSync(gh, params, opts);
  return JSON.parse(out);
}

function git(args, buffer) {
  const opts = { encoding: buffer ? 'buffer' : 'utf8', maxBuffer: 50 * 1024 * 1024, cwd };
  return execFileSync('git', args, opts);
}

function run() {
  // 1. Remote parent state.
  const ref = ghApi(['--method', 'GET', `repos/${repo}/git/ref/heads/${branch}`]);
  const parentSha = ref.object.sha;
  console.log('Remote HEAD:', parentSha);
  const parentCommit = ghApi(['--method', 'GET', `repos/${repo}/git/commits/${parentSha}`]);
  const parentTree = parentCommit.tree.sha;
  console.log('Parent tree:', parentTree);

  // 2. All paths tracked by the local HEAD commit.
  const paths = git(['ls-tree', '-r', '--name-only', 'HEAD'])
    .split(/\r?\n/)
    .filter(Boolean);
  console.log('Uploading', paths.length, 'files');

  // 3. Create blobs for every file.
  const entries = paths.map((path) => {
    const content = git(['cat-file', 'blob', `HEAD:${path}`], true);
    const blob = ghApi(
      ['--method', 'POST', `repos/${repo}/git/blobs`, '--input', '-'],
      { content: content.toString('base64'), encoding: 'base64' }
    );
    console.log('  blob', path, blob.sha.slice(0, 7));
    return { path, mode: '100644', type: 'blob', sha: blob.sha };
  });

  // 4. Create a new tree based on the remote parent tree.
  const tree = ghApi(
    ['--method', 'POST', `repos/${repo}/git/trees`, '--input', '-'],
    { base_tree: parentTree, tree: entries }
  );
  console.log('New tree:', tree.sha);

  // 5. Create the commit.
  const commit = ghApi(
    ['--method', 'POST', `repos/${repo}/git/commits`, '--input', '-'],
    { message, tree: tree.sha, parents: [parentSha] }
  );
  console.log('New commit:', commit.sha);

  // 6. Fast-forward the branch.
  const updated = ghApi(
    ['--method', 'PATCH', `repos/${repo}/git/refs/heads/${branch}`, '--input', '-'],
    { sha: commit.sha, force: false }
  );
  console.log('Branch updated:', updated.object.sha);
}

try {
  run();
} catch (err) {
  console.error('PUSH_VIA_API_FAILED:', err.stderr ? err.stderr.toString() : err.message);
  process.exit(1);
}
