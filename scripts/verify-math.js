// Deterministic math checks for calculator formatters.
// Run: node scripts/verify-math.js

function fmt(n) {
  return (Math.round(n * 1000) / 1000)
    .toString()
    .replace(/(\.\d*?)0+$/, '$1')
    .replace(/\.$/, '');
}

function closeTo(actual, expected, tolerance, label) {
  const ok = Math.abs(actual - expected) <= tolerance;
  console.log((ok ? 'PASS' : 'FAIL') + ' ' + label + ' => ' + actual);
  if (!ok) process.exitCode = 1;
}

console.log('Formatter checks:');
console.log(fmt(300) === '300' ? 'PASS fmt(300) => 300' : 'FAIL fmt(300) => ' + fmt(300));
console.log(fmt(6.667) === '6.667' ? 'PASS fmt(6.667)' : 'FAIL fmt(6.667)');
console.log(fmt(2) === '2' ? 'PASS fmt(2)' : 'FAIL fmt(2)');

console.log('\nPrint size math (3000 x 2000 px @ 300 DPI):');
closeTo(3000 / 300, 10, 0.001, 'width inches');
closeTo(2000 / 300, 6.6667, 0.001, 'height inches');
closeTo((2000 / 300) * 2.54, 16.9333, 0.001, 'height cm');

console.log('\nPaper size math (A4 @ 300 DPI):');
closeTo(Math.round((210 / 25.4) * 300), 2480, 0.5, 'A4 width px');
closeTo(Math.round((297 / 25.4) * 300), 3508, 0.5, 'A4 height px');

console.log('\nAspect math (1920 x 1080):');
const g = (a, b) => { while (b) { const t = b; b = a % b; a = t; } return a; };
const divisor = g(1920, 1080);
console.log(divisor === 120 ? 'PASS gcd' : 'FAIL gcd => ' + divisor);
console.log(1920 / divisor + ':' + 1080 / divisor === '16:9' ? 'PASS ratio' : 'FAIL ratio');
