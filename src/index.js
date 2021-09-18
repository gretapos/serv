let tekstas = "123645";

let sk = 0;
for (let i = 0; i < tekstas.length; i++) {
    sk *= 10;
    sk += tekstas.charCodeAt(i) - 48;
    // console.log(tekstas[i]);
    // console.log(tekstas.charCodeAt(i));
    // console.log(tekstas.charCodeAt(i) - 48);
}
console.log(sk);