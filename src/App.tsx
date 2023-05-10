import React, {useEffect} from "react";
import './App.css';
import 'antd/dist/reset.css'
import {BrowserRouter, HashRouter, Link, Navigate, Route, Routes} from "react-router-dom";
import {LoginPage} from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/preloader/Preloader";
import {withRouter} from "./hoc/withRouter";
import store, {AppStateType} from "./redux/redux-store";
import ProfileContainer from "./components/Profile/ProfileContainer";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import {UsersPage} from "./components/Users/UsersContainer";
import {Breadcrumb, Layout, Menu} from 'antd'
import {LaptopOutlined, NotificationOutlined, UserOutlined} from '@ant-design/icons'
import {Header} from './components/Header/Header'
import {ChatPage} from "./pages/ChatPage";

const {SubMenu} = Menu
const {Content, Footer, Sider} = Layout

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}

const App: React.FC<MapPropsType & DispatchPropsType> = (props) => {

    const catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
        alert("Some error occured")
    }
    const addWindowListener = () => {
        props.initializeApp()
        window.addEventListener("unhandledrejection", catchAllUnhandledErrors)
    }
    const removeWindowListener = window.removeEventListener("unhandledrejection", catchAllUnhandledErrors)

    useEffect(() => {
        addWindowListener()
        return removeWindowListener
    }, [])

    if (!props.initialized) {
        return <Preloader/>
    }
    return (
        <Layout>
            <Header/>
            <Content style={{padding: '0 50px'}}>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Layout className="site-layout-background" style={{padding: '24px 0'}}>
                    <Sider className="site-layout-background" width={200}>
                        <Menu
                            mode="inline"
                            style={{height: '100%'}}
                        >
                            <SubMenu key="sub1" icon={<UserOutlined/>} title="My Profile">
                                <Menu.Item key="1"> <Link to="/profile">Profile</Link></Menu.Item>
                                <Menu.Item key="2"> <Link to="/dialogs">Messages</Link></Menu.Item>
                                <Menu.Item key="3">option3</Menu.Item>
                                <Menu.Item key="4">option4</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" icon={<LaptopOutlined/>} title="Developers">
                                <Menu.Item key="5"><Link to="/developers">Developers</Link></Menu.Item>
                                <Menu.Item key="6">option6</Menu.Item>
                                <Menu.Item key="7">option7</Menu.Item>
                                <Menu.Item key="8">option8</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" icon={<NotificationOutlined/>} title="subnav 3">
                                <Menu.Item key="9"><Link to="/chat">Chat</Link></Menu.Item>
                                <Menu.Item key="10">option10</Menu.Item>
                                <Menu.Item key="11">option11</Menu.Item>
                                <Menu.Item key="12">option12</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Content style={{padding: '0 24px', minHeight: 280}}>

                        <Routes>
                            <Route path='/'
                                   element={<Navigate to={'/profile'}/>}/>

                            <Route path='/dialogs'
                                   element={<React.Suspense fallback={<Preloader/>}><DialogsContainer/>
                                   </React.Suspense>}/>

                            <Route path='/profile/:userId?'
                                   element={<ProfileContainer/>}/>

                            <Route path='/developers'
                                   element={<UsersPage pageTitle={'Самураи'}/>}/>

                            <Route path='/login'
                                   element={<LoginPage/>}/>

                            <Route path='/chat'
                                   element={<React.Suspense fallback={<Preloader/>}><ChatPage/></React.Suspense>}/>

                            <Route path='*'
                                   element={<div>404 NOT FOUND</div>}/>
                        </Routes>

                    </Content>
                </Layout>
            </Content>
            <Footer style={{textAlign: 'center'}}>Social Network ©2023 Created by $$$</Footer>
        </Layout>
    )
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})

let AppContainer = compose<React.ComponentType>(    // compose объединяет функции с право на лево.
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

const SocialJSApp: React.FC = () => {
    return <HashRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </HashRouter>
}

export default SocialJSApp;
