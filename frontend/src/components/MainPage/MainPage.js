import LoginForm from '../SessionForms/LoginForm';
import './MainPage.css';

function MainPage(){
    return (
        <div id='container-mainpage'>
            <div>
                <div id='div-left'>
                    <label id='label-title'>Meetbook</label>
                    <label id='label1'>
                        Unlock a world of connections with Meetbook!
                    </label>
                    <label id='label2'>
                        Your go-to platform for sharing, discovering,
                    </label>
                    <label id='label3'>
                        and staying close with friends.
                    </label>
                    <label id='label4'>Start sharing your story today!</label>
                </div>
                <div id='div-right'>
                    <LoginForm />
                </div>
            </div>
            <footer>
                Copyright &copy; 2023 Meetbook
            </footer>
        </div>
    )
}

export default MainPage;