// Add zero padding
function zeroPad(number, size = 2) {
  let s = String(number);
  while (s.length < size) { s = '0' + s;}
  return s;
}

// Convert time from miliseconds int to hh:mm:ss.S string
export default function timeFormat(miliseconds) {

  let remaining = miliseconds / 1000;
  
  remaining %= 3600;

  const mm = parseInt( remaining / 60, 10 );
  const ss = parseInt( remaining % 60, 10 );

  return `${ zeroPad( mm ) }:${ zeroPad( ss ) }`;
}