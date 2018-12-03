import React, { Component } from 'react';
import './App.css';
import  {Layout, Header, Navigation, Drawer, Content} from 'react-mdl';
import Main from './components/main';
import {Link} from 'react-router-dom';
import logoutWhite from './images/logout-icon.png'
import logoutBlack from './images/logout-iconBlack.png'
import Login from './Login'

class App extends Component {
  render() {
    return (
        <div className="content">
            <Layout fixedHeader>
                <Header title="Kindergarten Development Tool" scroll>
                    <Navigation>
                        <Link to="/">Home</Link>
                        <Link to="/notifications">Notifications</Link>
                        <Link to="/messages">Messages</Link>
                        <Link to="/group">Group</Link>
                        <Link to="/childrenspage">Children's Page</Link>
                        <Link to="/adminpage">AdminPage</Link>
                        <Link to="" onClick={Login}><img src={logoutWhite} style = {{height: 20}} ></img></Link>

                    </Navigation>
                </Header>
                <Drawer title="KDT">
                    <Navigation>
                        <Link to="/">Home</Link>
                        <Link to="/notifications">Notifications</Link>
                        <Link to="/messages">Messages</Link>
                        <Link to="/group">Group</Link>
                        <Link to="/childrenspage">Children's Page</Link>
                        <Link to="/adminpage">AdminPage</Link>
                        <Link to="" onClick={Login}><img src={logoutBlack} style = {{height: 20}}></img></Link>
                    </Navigation>
                </Drawer>
                <Content>
                    <div className="page-content" />
                    <Main/>
                </Content>
            </Layout>
        </div>
    );
  }
}

export default App;
