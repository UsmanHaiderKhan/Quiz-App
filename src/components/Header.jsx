import logoImg from '../assets/quiz-logo.png';
export default function Header() {
    return (
        <header id='header'>
            <img src={logoImg} alt='Quiz Logo' />
            <h1>React Quiz APP</h1>
        </header>
    )

}