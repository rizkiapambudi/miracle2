import * as React from 'react';
import './App.css';
import { Routes, Route, useParams } from "react-router-dom";

import CategoryList from "./pages/CategoryList";
import DetailResep from "./pages/DetailResep";
import LangkahResep from "./pages/LangkahResep";
import Reaction from "./pages/Reaction";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Thanks from "./pages/Thanks";
import ServeHistory from "./pages/ServeHistory";
import Miracle from "./pages/Miracle";


class App extends React.Component{

  render() { 

    // console.log('this.props', this.props)

    const WrapperDetailResep = (props) => {
      const params = useParams();
      return <DetailResep {...{...props, match: {params}} } />
    }
    
    const WrapperLangkahResep = (props) => {
      const params = useParams();
      return <LangkahResep {...{...props, match: {params}} } />
    }
    
    const WrapperReaction = (props) => {
      const params = useParams();
      return <Reaction {...{...props, match: {params}} } />
    }

    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Miracle />} />
          <Route path="login" element={<Login />} />
          <Route path="home" element={<CategoryList />} />
          <Route path="detailresep/:id" element={<WrapperDetailResep />} />
          <Route path="langkah-masak/:idresep/:idserve" element={<WrapperLangkahResep />} />
          <Route path="reaction/:idresep/:idserve" element={<WrapperReaction />} />
          <Route path="/serve-history" element={<ServeHistory />}/>
          <Route path="/thanks" element={<Thanks />}/>
          <Route path="/404" element={<NotFound />}/>
        </Routes>
      </div>
    );
  }
}

export default App;
