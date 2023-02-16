import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";


export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();
var amogus = null
  async function onSubmit(event) { 
    if (amogus !== true) {
      amogus = true
    event.preventDefault();

      var speech = true;
      window.SpeechRecognition = window.webkitSpeechRecognition;
  
      const recognition = new SpeechRecognition();
      recognition.interimResults = false;
  
      recognition.addEventListener('result', e => {
          const transcript = Array.from(e.results)
              .map(result => result[0])
              .map(result => result.transcript)
              .join('')

          console.log(transcript);


            recognition.stop()
            geta(transcript)
           
           
      }
      );
      
      if (speech == true) {
          recognition.start();
          return false

      }
      

  return false
    }
    else {
      console.log("request still pending, cannot speak now.")
    }
  }
  async function geta(thing) {

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: thing }),
      });
      await console.log(thing)
      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
        return false
      }

      setResult(data.result);
      console.log(data.result)
      var msg = new SpeechSynthesisUtterance();
      msg.text = data.result
      await window.speechSynthesis.speak(msg);
      amogus = false
    } catch(error) {
      console.error(error);
      alert(error.message);
      return false
    }
    return false
  }

  return (
    <div>
      <script>
          
      </script>
      <Head>
        <title>Voice-GPT</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>VoiceGPT</h3>
        <form onSubmit={onSubmit}>
          <input id="click_to_record" type="submit" value="🎤" />
 
        </form>
        <div className={styles.result}>{result}</div>
       
<div style={{
  position: "fixed",
  textAlign: "center",
  bottom: "0",
}}>
Made with ❤ by perko#6901
  </div>
      </main>
      

    </div>
    
  );
}
