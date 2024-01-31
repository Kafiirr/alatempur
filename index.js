const { ethers } = require("ethers");

const provider = new ethers.providers.JsonRpcProvider(""); //isi rpc dimari
const receiver = ""; //address penerima

const privateKeys = [""]; //input private key dimari

//auto send value dari addr ini ke addr penerima
const botSend = async () => {
    provider.on("block", async () => {
        console.log("Listen New Block,🙈 waiting 🙈");
        for (let i =0; i < privateKeys.length; i++) {
            const _target = new ethers.Wallet(privateKeys[i]);
            const target = _target.connect(provider);
            const balance = await provider.getBalance(target.address); //balance addr
            const tx = ethers.utils.parseEther(".005") //gas untuk transfer
            if (balance.sub(tx) > 0){
                console.log("Ether Find on account 🥳")
                const amount = balance.sub(tx); //seberapa banyak untuk dikirim value ether - gas;
                try {
                    await target.sendTransaction({
                        to: receiver,
                        value: amount,
                    })
                    console.log(`✅ Transfer Success ✅ value -> ${ethers.utils.formatEther(balance)}`)
                } catch (e){
                    console.error("error", e);
                }
            }
        };
    });
}

botSend();
