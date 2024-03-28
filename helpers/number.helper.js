const FromBigNumberToDecimal = () => {
    const decimal = Number('0x6a3f9bd1454017');
    const decimal2 = Number('0x23955edc10ca01');
    const decimal3 = Number('0x22b7330eec8a53');
    console.log(decimal);
    console.log(decimal3);
    console.log(decimal*1.005);
    const eth  = (decimal / 10 ** 18)* 0.9639369149363138;
    console.log("Decimal: " + decimal + "\nETH: " + eth);
}

FromBigNumberToDecimal();