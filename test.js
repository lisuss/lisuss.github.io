function solution(roman){
    const romana = roman.map
    romana.forEach = function(rom) {
        if(rom === 'I')
         rom += 1;
        else if (rom === 'V') {
             rom+= 5;
        } else if (rom === 'X') {
             rom += 10
        } else if (rom === 'L') {
            rom += 50
        } else if (rom === 'C') {
            rom += 100
        } else if (rom === 'D') {
            rom += 500
        } else if (rom === 'M') {
            rom += 100
        }
        return rom
    }    
  }