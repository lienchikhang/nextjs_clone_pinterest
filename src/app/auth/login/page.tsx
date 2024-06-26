import ModalLogin from "@/app/components/ModalLogin";
import SlideShow from "@/app/components/SlideShow";
import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Login - Pinterest",
    description: "Register account for Pinterest",
};

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #fff',
    borderRadius: '16px',
    '&:focus': {
        outline: 'none',
    },
    boxShadow: 24,
    p: 4,
};

const Login = () => {

    return (
        <div>
            <SlideShow />
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={true}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={true}>
                    <Box sx={style} className='modal__wrapper'>
                        <div className='modal__top'>
                            <svg height="40" viewBox="-3 -3 82 82" width="40">
                                <title>Pinterest logo</title>
                                <circle cx="38" cy="38" fill="white" r="40"></circle>
                                <path d="M27.5 71c3.3 1 6.7 1.6 10.3 1.6C57 72.6 72.6 57 72.6 37.8 72.6 18.6 57 3 37.8 3 18.6 3 3 18.6 3 37.8c0 14.8 9.3 27.5 22.4 32.5-.3-2.7-.6-7.2 0-10.3l4-17.2s-1-2-1-5.2c0-4.8 3-8.4 6.4-8.4 3 0 4.4 2.2 4.4 5 0 3-2 7.3-3 11.4C35.6 49 38 52 41.5 52c6.2 0 11-6.6 11-16 0-8.3-6-14-14.6-14-9.8 0-15.6 7.3-15.6 15 0 3 1 6 2.6 8 .3.2.3.5.2 1l-1 3.8c0 .6-.4.8-1 .4-4.4-2-7-8.3-7-13.4 0-11 7.8-21 22.8-21 12 0 21.3 8.6 21.3 20 0 12-7.4 21.6-18 21.6-3.4 0-6.7-1.8-7.8-4L32 61.7c-.8 3-3 7-4.5 9.4z" fill="red" fillRule="evenodd"></path></svg>
                            <Typography className="title" id="transition-modal-title" variant="h4" component="h2">
                                Welcome to Pinterest
                            </Typography>
                            <p>Find new ideas to try</p>
                        </div>
                        <div className="modal__form">
                            <ModalLogin />
                        </div>
                        <div>
                            <span className="to-register">Don't have an account? <Link href={'/auth/register'}>Click here</Link></span>
                        </div>
                        <div className="modal__bottom">
                            <span>By continuing, you agree to Pinterest's</span>
                            <div></div>
                            <span> <a href="#">Terms of Service</a> and acknowledge you've read</span>
                            <div></div>
                            <span>our <a href="#">Privacy Policy</a>; Notice at collection</span>
                        </div>
                    </Box>
                </Fade>
            </Modal >
        </div >
    )
}

export default Login;