import '../App.css';
import '../buttons.css';
import logo from "../Logo2.png";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';


function Home() {
    const navigate = useNavigate();

    const redirectToDashboard = () => {
        navigate('/dashboard');
      };

    const [showFailedAlert, SetShowFailedAlert] = useState(false);
    const [isFailed, setIsFailed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
    if (isFailed)  {
        SetShowFailedAlert(true);
    }
    },[isFailed]);

    const handleSubmit = async(event) => {

    event.preventDefault();
    setIsLoading(true);

    const url = event.target.url.value;

    console.log(url);  // log the URL to the console, or do whatever you need with it

    try {
        const response = await fetch(`http://localhost:5000/api/getWebsiteData?url=${encodeURIComponent(url)}`);
        if (!response.ok) {
        console.error('Failed to fetch website data:', response.statusText);
        setIsFailed(true);
        return;
        }
    const data = await response.json();
    console.log('data - ', data);
    redirectToDashboard();

    } catch (error) {
        console.error('Error fetching website data:', error);
        setIsFailed(true);

    } finally {
        setIsLoading(false);  // set isLoading back to false at the end of the function, whether or not the fetch succeeded
    }

    }


    return (
    <>
        {showFailedAlert &&
        <div className="alert alert-danger alert-dismissible custom-alert fade in show">
        {/* <a href="/#" className="close" data-dismiss="alert" aria-label="close">&times;</a> */}
        <button type="button" className="close" data-dismiss="alert" aria-label="close" onClick={() => SetShowFailedAlert(false)}>&times;</button>
        <strong>Oops!</strong> Something went wrong... Try again later!
        </div>
        }

        {/* <!-- Favicon--> */}
        <link rel="icon" type="image/x-icon" href="assets/favicon.ico"/>
        {/* <!-- Custom Google font--> */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@100;200;300;400;500;600;700;800;900&amp;display=swap" rel="stylesheet" />
        {/* <!-- Bootstrap icons--> */}
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css" rel="stylesheet" />
        {/* <!-- Core theme CSS (includes Bootstrap)--> */}
        <div className="d-flex flex-column h-100">
            <main className="flex-shrink-0">
                {/* <!-- Navigation--> */}
                
                <nav className="navbar navbar-expand-lg navbar-light bg-white py-3">
                    <div className="container px-5">
                        {/* <a className="navbar-brand" href="index.html"><span className="fw-bolder text-primary">Start Bootstrap</span></a> */}
                        <img src={logo} alt=''></img>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 small fw-bolder">
                                <li className="nav-item"><a className="nav-link" href="index.html">Home</a></li>
                                <li className="nav-item"><a className="nav-link" href="resume.html">Resume</a></li>
                                <li className="nav-item"><a className="nav-link" href="projects.html">Projects</a></li>
                                <li className="nav-item"><a className="nav-link" href="contact.html">Contact</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                {/* <!-- Header--> */}
                <header className="py-5">
                    <div className="container px-5 pb-5">
                        <div className="row gx-5 align-items-center">
                            <div className="col-xxl-5">
                                {/* <!-- Header text content--> */}
                                <div className="text-center text-xxl-start">
                                    <div className="badge bg-gradient-primary-to-secondary text-white mb-4"><div className="text-uppercase">learn &middot; implement &middot; upgrade</div></div>
                                    <div className="fs-3 fw-light text-muted">I can help your business to</div>
                                    <h1 className="display-3 fw-bolder mb-5"><span className="text-gradient d-inline">Free AI online Website Analyzing Tool </span></h1>
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-floating mb-3 d-flex">
                                            <input className="form-control" id="url" type="url" placeholder="website.com" data-sb-validations="required,url" />
                                            <label htmlFor="url">Enter your website address</label>
                                            <div className="invalid-feedback" data-sb-feedback="url:required">A url address is required.</div>
                                            <div className="invalid-feedback" data-sb-feedback="url:url">url is not valid.</div>
                                        </div>
                                        {isLoading ? (

                                        <button type="submit" className='analyze-button' disabled={true}>
                                            <div className="svg-wrapper-1">
                                            <div className="svg-wrapper">
                                            <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                            </div>
                                            </div>
                                            <span>Loading...</span>
                                        </button>
                                        
                                        ) : (
                                        <button type="submit" className='analyze-button'>
                                            <div className="svg-wrapper-1">
                                            <div className="svg-wrapper">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                                <path fill="none" d="M0 0h24v24H0z"></path>
                                                <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
                                                </svg>
                                            </div>
                                            </div>
                                            <span>Analyze</span>
                                        </button>
                                        )}
                                    </form>
                                </div>
                            </div>
                            <div className="col-xxl-7">
                                {/* <!-- Header profile picture--> */}
                                <div className="d-flex justify-content-center mt-5 mt-xxl-0">
                                    <div className="profile ">
                                        {/* <!-- TIP: For best results, use a photo with a transparent background like the demo example below--> */}
                                        {/* <!-- Watch a tutorial on how to do this on YouTube (link)--> */}
                                        {/* <img className="profile-img" src="assets/profile.png" alt="..." /> */}
                                        <img className="profile-img" src="assets/Launching-new.gif" alt="floating rocket"></img>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                {/* <!-- About Section--> */}
                <section className="bg-light py-5">
                    <div className="container px-5">
                        <div className="row gx-5 justify-content-center">
                            <div className="col-xxl-8">
                                <div className="text-center my-5">
                                    <h2 className="display-5 fw-bolder"><span className="text-gradient d-inline">About Me</span></h2>
                                    <p className="lead fw-light mb-4">My name is Start Bootstrap and I help brands grow.</p>
                                    <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit dolorum itaque qui unde quisquam consequatur autem. Eveniet quasi nobis aliquid cumque officiis sed rem iure ipsa! Praesentium ratione atque dolorem?</p>
                                    <div className="d-flex justify-content-center fs-2 gap-4">
                                        <a className="text-gradient" href="#!"><i className="bi bi-twitter"></i></a>
                                        <a className="text-gradient" href="#!"><i className="bi bi-linkedin"></i></a>
                                        <a className="text-gradient" href="#!"><i className="bi bi-github"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            {/* <!-- Footer--> */}
            <footer className="bg-white py-4 mt-auto">
                <div className="container px-5">
                    <div className="row align-items-center justify-content-between flex-column flex-sm-row">
                        <div className="col-auto"><div className="small m-0">Copyright &copy; Your Website 2023</div></div>
                        <div className="col-auto">
                            <a className="small" href="#!">Privacy</a>
                            <span className="mx-1">&middot;</span>
                            <a className="small" href="#!">Terms</a>
                            <span className="mx-1">&middot;</span>
                            <a className="small" href="#!">Contact</a>
                        </div>
                    </div>
                </div>
            </footer>
            {/* <!-- Bootstrap core JS--> */}
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
            {/* <!-- Core theme JS--> */}
            <script src="js/scripts.js"></script>
        </div>
    </>

    );
}

export default Home;
