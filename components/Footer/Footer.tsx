import css from './Footer.module.css'

const Footer = () => {

    return (
        <footer className={css.footer}>
            <div className={css.content}>
                <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
                <div className={css.wrap}>
                    <p>Developer: Mishenina Nadiia</p>
                    <p>
                        Contact us:
                        <a href="mailto:ya.nadegda2014@gmail.com">ya.nadegda2014@gmail.com</a>
                    </p>
                </div>
            </div>
        </footer>

    )
}

export default Footer