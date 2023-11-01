import {useState} from 'react'
import axios from 'axios'

const formEndpoint = import.meta.env.VITE_APP_WP_API_FORM_ENDPOINT

console.log(formEndpoint);

const ContactForm = () => {
    // setup state for contact form submission
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    // state for input values
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault()
        // object for our form - append data to it so we can send it
        const testForm = new FormData()
        testForm.append('your-name', name)
        testForm.append('your-email', email)
        testForm.append('your-message', message)

        // AXIOS CALL
        // first argument is the endpoint, second is the the form data:
        axios.post(formEndpoint, testForm, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        .then(function (response) {
            console.log(response);
            // update state to show submitted
            setSubmitted(true);
        })
        .catch((error) => {
            console.log(error);
            setError(true)
        })
    }

    // Conditionals - if Submitted or if Error
    if (submitted) {
        return (
            <>
                <h3>Thank you for your message!</h3>
                <p>We'll be in touch soon &#128513;</p>
            </>
        )
    }

    if (submitted) {
        return (
            <>
                <h3>Thank you for your message!</h3>
                <p>We'll be in touch soon &#128513;</p>
            </>
        )
    }


     // Form to be returned
     return (
        <>
        <div className='form-container'>
            <form
            onSubmit={handleSubmit}
            method="POST"
            >
                 {/* Name input */}
                <div>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    name="name"
                    onChange={(event) => setName(event.target.value)}
                    value={name}
                    required
                />
                </div>
                {/* Email input */}
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        type="email"
                        name="email"
                        onChange={(event) => setEmail(event.target.value)}
                        value={email}
                        required
                    />
                </div>
                {/* Message input */}
                <div>
                    <label htmlFor='message'>Message</label>
                    <textarea
                        name="message"
                        onChange={(event) => setMessage(event.target.value)}
                        value={message}
                        required
                    />
                </div>

                <div className='send-message-container'>
                    <button
                        className='regular-button'
                        type="submit"
                    >
                        Send Message
                    </button>
                </div>
            </form>
            </div>
        </>
    )
    
}

const Contact = () => {
  return (
    <>
    <div id='contact-container' className='container'>
        <div>
            <h2>Contact Us</h2>
            <ContactForm/>
        </div>
    </div>
    </>
  )
}

export default Contact
