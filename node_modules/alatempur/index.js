const { ethers } = require("ethers");

const provider = new ethers.providers.JsonRpcProvider(""); //isi rpc dimari
const receiver = ""; //address penerima

const privateKeys = [""]; //input private key dimari

//auto send value dari addr ini ke addr penerima
const botSend = async () => {
    provider.on("block", async () => {
        console.log("Menunggu Block Selanjutnya,🙈 tunggu sebentar 🙈");
        for (let i =0; i < privateKeys.length; i++) {
            const _target = new ethers.Wallet(privateKeys[i]);
            const target = _target.connect(provider);
            const balance = await provider.getBalance(target.address); //balance addr
            const tx = ethers.utils.parseEther(".005") //gas untuk transfer
            if (balance.sub(tx) > 0){
                console.log("Token ditemukan pada address ini 🥳")
                const amount = balance.sub(tx); //seberapa banyak untuk dikirim value ether - gas;
                try {
                    await target.sendTransaction({
                        to: receiver,
                        value: amount,
                    })
                    console.log(`✅ Transfer Berhasil ✅ value -> ${ethers.utils.formatEther(balance)}`)
                } catch (e){
                    console.error("error", e);
                }
            }
        };
    });
}

botSend();
