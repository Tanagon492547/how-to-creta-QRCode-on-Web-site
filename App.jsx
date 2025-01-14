import { useState } from 'react'
import generatePayload from 'promptpay-qr'
import qrcode from 'qrcode'

function App() {
  const [count, setCount] = useState();
  const [showmonney, setShowmonney] = useState(0);
  const [qrcodeshow, setQrcodeshow] = useState("");
  const mobileNumber = '082-049-2004';

  const generater = ((payload, options) => {
    //new Promise((ส่งค่ากลับเมื่อผ่าน, ส่งค่า Error)
    return new Promise((resolve, reject) => {
      qrcode.toString(payload, options, (err, svg) => {
        if (err) return reject(err)
        resolve(svg)
      })
    })
  })

  function genaret() {
    let amount = parseInt(count);
    setShowmonney(amount);
    //generatePayload(mobileNumber, {amount : จำนวนเงิน}) การสร้าง qrcode เเต่จะถูกสร้างมาเป็น string 
    let payload = generatePayload(mobileNumber, { amount: amount })
    setQrcodeshow(payload)

    const options = {
      type: 'svg',
      color: {
        dark: '#003b6a',
        light: '#f7f8f7'
      }
    }
    //เรียกใช้ generater
    generater(payload, options)
      .then((svg) =>
        setQrcodeshow(svg)
      )
      .catch((err) =>
        console.error(err)
      )

  }
  return (
    <>
    
      <input type="text"
        value={count}
        onChange={(e) => setCount(e.target.value)}
      />
      <button onClick={() => genaret()}>OK</button>

      <h1>เเสดง QR Prompay</h1>
      {showmonney}
      <br></br>
      <div style={{ width: "500px" }}
        dangerouslySetInnerHTML={{ __html: qrcodeshow }} //เป็นคุณสมบัติพิเศษใน React ที่อนุญาตให้คุณแทรก HTML ดิบ (raw HTML) ลงในองค์ประกอบ (element) ได้โดยตรง โดยไม่ต้องเขียน HTML ผ่าน JSX ตามปกติ
      />
    </>
  )
}

export default App
