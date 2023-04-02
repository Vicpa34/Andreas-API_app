import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'
function App() {
  const [firstname, setFirstname] = useState<string>('')
  const [lastname, setLastname] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [car, setCar] = useState<string>('')
  const [purchasedate, setPurchasedate] = useState<string>('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const f = async () => {
      const r = await axios.get(`https://randomuser.me/api/`).then(e => e).catch(err => console.log(err))
      // console.log(r);
      if (r?.data) {
        setEmail(r?.data?.results?.[0]?.email)
        setFirstname(r?.data.results[0].name.first)
        setLastname(r?.data.results[0].name.last)
      }
    }
    f()
  }, [])

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(firstname);
    setLoading(true)
    const baseUrl = "https://acc-test-vjn7.onrender.com/form"
    const result = await axios.post(baseUrl,
      { firstname, lastname, email, car, purchasedate },
      {
        headers: {
          "content-type": "application/json",
          "x-api-key": "letmein"
        }
      }
    ).catch(err => console.log(err))
    setLoading(false)
    console.log (result)
    if(result?.status === 200){
      alert("Success!")
      console.log(result.data);
      
    }
  }


  return (
    <div className="app">
    
      <form className="form" action="" 
        onSubmit={(e: any) => handleSubmit(e)}>
        <div className="">
          <label htmlFor="firstname">Firstname:</label><br />
          <input required type="text" placeholder='firstname' id="firstname"
            value={firstname}
            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setFirstname(e.target.value)}
          />
        </div>
        <div className="">
          <label htmlFor="lastname">Lastname:</label><br />
          <input required type="text" placeholder='lastname' id="lastname"
            value={lastname}
            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setLastname(e.target.value)}
          />
        </div>
        <div className="">
          <label htmlFor="email">Email:</label><br />
          <input required type="email" placeholder='email' id="email"
            value={email}
            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setEmail(e.target.value)}
          />
        </div>
        <div className="">
          <label htmlFor="car">Car:</label><br />
          <select required id="car"
            value={car}
            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setCar(e.target.value)}
          >
            <option value="">select</option>
            <option value="Golf">Golf</option>
            <option value="Arteon">Arteon</option>
            <option value="Tiguan">Tiguan</option>
          </select>
        </div>
        <div className="">
          <label htmlFor="purchasedate">Purchasedate:</label><br />
          <input required type="date" min='2018-01-01' placeholder='purchasedate' id="purchasedate"
            value={purchasedate}
            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPurchasedate(e.target.value)}
          />
        </div>
        <br />

        <button type='submit'>{loading ? "processing..." : "submit"}</button>
      </form>
    </div>
  );
}

export default App;
