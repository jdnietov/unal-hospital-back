import Option from "./option";

interface Question {
    title: String,
    type: String
    options: [Option],
}

export default Question