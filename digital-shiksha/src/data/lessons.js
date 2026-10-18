// Digital Shiksha - Lessons Data
export const LESSONS = {
    // Course 1: Computer Fundamentals
    'course-1': [
        {
            id: 'lesson-1-1',
            title: 'What is a Computer?',
            titleHi: 'कंप्यूटर क्या है?',
            titleMr: 'संगणक काय आहे?',
            content: `A computer is an electronic device that can store, retrieve, and process data. It consists of hardware (physical parts) and software (programs). In simple terms, think of it as a powerful calculator that can perform many tasks.

**Key points:**\n- Hardware includes CPU, memory, storage, input & output devices.\n- Software tells the hardware what to do.`,
            videoUrl: '', // placeholder for future video
            quizId: 'quiz-1-1'
        },
        {
            id: 'lesson-1-2',
            title: 'Input and Output Devices',
            titleHi: 'इनपुट और आउटपुट डिवाइस',
            titleMr: 'इनपुट आणि आउटपुट डिव्हायसेस',
            content: `Input devices let you give information to the computer (e.g., keyboard, mouse, microphone). Output devices show results (e.g., monitor, speakers, printer).`,
            videoUrl: '',
            quizId: 'quiz-1-2'
        },
        {
            id: 'lesson-1-3',
            title: 'Hardware vs Software',
            titleHi: 'हार्डवेयर बनाम सॉफ्टवेयर',
            titleMr: 'हार्डवेअर विरुद्ध सॉफ्टवेअर',
            content: `Hardware is the physical components you can touch. Software is the set of instructions that runs on hardware. Both are needed for a computer to work.`,
            videoUrl: '',
            quizId: 'quiz-1-3'
        }
    ],
    // Course 2: Internet Basics
    'course-2': [
        {
            id: 'lesson-2-1',
            title: 'What is the Internet?',
            titleHi: 'इंटरनेट क्या है?',
            titleMr: 'इंटरनेट काय आहे?',
            content: `The Internet is a global network of computers that communicate with each other. It allows sharing of information, services, and resources worldwide.`,
            quizId: 'quiz-2-1'
        },
        {
            id: 'lesson-2-2',
            title: 'Web Browsers',
            titleHi: 'वेब ब्राउज़र',
            titleMr: 'वेब ब्राउझर',
            content: `A web browser (e.g., Chrome, Firefox) lets you view websites. It translates web addresses (URLs) into pages you can read.`,
            quizId: 'quiz-2-2'
        },
        {
            id: 'lesson-2-3',
            title: 'Search Engines',
            titleHi: 'सर्च इंजन',
            titleMr: 'शोध इंजिन',
            content: `Search engines like Google help you find information on the Internet by typing keywords.`,
            quizId: 'quiz-2-3'
        }
    ]
    // Additional courses can be added similarly.
};
