import { v4 as uuidv4 } from 'uuid';
export const validateEmail = (email:string) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );
        
};
export const initQuestions = [
    {
        id: uuidv4(),
        description: '',
        imageFile: '',
        imageName: '',
        answers: [
            {
                id: uuidv4(),
                description: '',
                isCorrect: false,
            },
        ],
    },
];
