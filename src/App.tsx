import { useMemo, useState } from "react";
import { useGlobalProvider } from "hooks";
import { CreateQuiz, Loader, Quiz, Results } from "components";
import { View } from "types";
import "./styles.css";
import { useEffect } from "react";

function App() {
  const [isHovered, setIsHovered] = useState(false);
  const { showLoader, view } = useGlobalProvider();
  function home() {
    const l = document.getElementById('bt');
    if(l!=null){
      l.remove();
    }
    const l2 = document.getElementById('inst');

    if(l2!=null){
      l2.remove();
    }
    document.getElementById('bod').style.visibility = 'visible';
  }
  const renderView = useMemo(() => {
    switch (view) {
      case View.Quiz:
        return <Quiz />;
      case View.Done:
        return <Results />;
      default:
        return <CreateQuiz />;
    }
  }, [view]);
  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        autoDisplay: false
      },
      "google_translate_element"
    );
  };
  useEffect(() => {
    var addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);
  return (
    <>
    <div id="google_translate_element"></div>
    <section id = 'an'>
    <button id = 'bt' onClick={home}><img id = 'hom' src = "play.jpg"></img></button>
    <button id = "btn" onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)} >WELCOME</button>
        {isHovered && (<h3>Answer Trivia Questions Obviously</h3>)}

      <a id = "inst" href="#">
      <span id = 'i'>Instructions</span>
      <span id = 'ia'>Answer Trivia Questions Obviously </span>
    </a>
    </section>
   
    <body id = "bod">
   
      <div id = 'sub' className="container is-max-desktop py-4">
        <h1 id = 'head' className="title has-text-centered">
          Trivia Time
        </h1>
        {renderView}
      </div>
      {showLoader && <Loader />}
      </body>
    </>
    
  );
}

export default App;
