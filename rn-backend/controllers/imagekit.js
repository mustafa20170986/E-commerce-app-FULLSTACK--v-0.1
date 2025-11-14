
import ImageKit from "imagekit";
import dotenv from 'dotenv'
dotenv.config()

const imagekit=new ImageKit({
    publicKey:"public_2IeVUftkbzKaxhdJyKPlsnKlZWc=",
    privateKey:"private_7OF2HcxY8+sNHQdoTsGYmIgMKeg=",
  urlEndpoint :"https://ik.imagekit.io/zuqazdd5w"
})

export default imagekit