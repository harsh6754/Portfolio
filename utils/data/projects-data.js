import ayla from '/public/image/ayla.jpg';
import crefin from '/public/image/crefin.jpg';
import realEstate from '/public/image/real-estate.jpg';
import travel from '/public/image/travel.jpg';

export const projectsData = [
    {
        id: 1,
        name: 'My-Book-Store',
        description: "Crafted a website enabling users to buy and sell used books to book lovers. Users can explore a book catalog, add books to their wishlist, sell books, and complete purchases via a payment link. Includes a recommendation engine for suggesting books based on search queries and price recommendations for sellers. Added a messaging feature to request unavailable books, notifying users who may wish to sell.",
        tools: ['React.js', 'TailwindCSS', 'Node.js', 'Express.js', 'MongoDB', 'FirebaseAuth', 'Docker'],
        role: 'Full Stack Developer',
        code: 'https://github.com/harsh6754/My-Book-Store',
        demo: 'https://my-book-store-seven.vercel.app/',
        image: '', // Add image if available
    },
    {
        id: 2,
        name: 'E-Waste Trade Hub',
        description: "Developed a dynamic platform for e-waste trading under Smart India Hackathon. Features a three-tier authentication system for buyers, sellers, and large buyers. Sellers can upload e-waste photos, and buyers submit offers. Integrates offer acceptance/decline, redeemable points for transactions, and multilingual support for English and local languages.",
        tools: ['React', 'Node', 'Express', 'MongoDB', 'TailwindCSS', 'Docker', 'AWS', 'jQuery', 'Redis'],
        role: 'Full Stack Developer',
        code: 'https://github.com/harsh6754/E-Waste-Trade-Hub',
        demo: 'https://startup-seven-lovat.vercel.app/',
        image: '', // Add image if available
    },
    {
        id: 3,
        name: 'AI Powered Real Estate',
        description: 'My team built an AI-based real estate app using Replicate API and OpenAI. We used Express, Typescript, OpenAI, Replicate, Stripe, and Mongoose to develop the API. We utilized NextJS, Formik, TailwindCSS, and other npm libraries for the UI. We have trained multiple AI assistants using the latest GPT model and integrated Replicate API for image processing. We added role-based auth, subscription plans, Cron job scheduling, and payment integration with Stripe.',
        tools: ['React', 'Bootstrap', 'SCSS', 'Stripe', 'Express', 'TypeScript', 'MongoDB', 'Azure Blob', 'OpenAI API', 'Replicate AI', 'Cronjob', 'JWT'],
        code: '',
        role: 'Full Stack Developer',
        demo: '',
        image: realEstate,
    },
    {
        id: 4,
        name: 'Newsroom Management',
        description: "My team and I developed a newspaper management dashboard application called Newsroom Management. As a front-end developer, I worked on creating the dashboard using NextJS, Material UI, Redux, Calendar, and other necessary npm libraries. We used React Redux to manage the application's state and React-hook-form and Sun Editor to handle forms.",
        tools: ['NextJS', 'Material UI', 'Redux', 'Sun Editor', "Calendar"],
        code: '',
        demo: '',
        image: ayla,
        role: 'Full Stack Developer',
    }
];


// Do not remove any property.
// Leave it blank instead as shown below

// {
//     id: 1,
//     name: '',
//     description: "",
//     tools: [],
//     role: '',
//     code: '',
//     demo: '',
//     image: crefin,
// },