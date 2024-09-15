// import passport from '../middleware/passport';
import { OpenAI } from "openai";
import { Request, Response } from "express";

// const gptApis = (app: any) => {
//   app.get('/gpt-init', passport.authenticate('jwt'), (req: Request, res: Response) => {
//     res.status(200).json({ loggedIn: true })
//   })

//   app.post('/requests', passport.authenticate('jwt'), async (req: Request, res: Response) => {
//     try {
//       const response = ```
//         import React from 'react';

//         const MyComponent = () => {
//           return (
//             <div>
//               <h1>Hello, React!</h1>
//               <p>This is a basic React component.</p>
//             </div>
//           );
//         };

//         export default MyComponent;
//       ```
//       res.status(200).json({
//         response: response
//       })
//     } catch (error) {
//       console.error('Error generating text:', error)
//       return error
//     }
//   })

//   app.post('/create-article', passport.authenticate('jwt'), async (req: Request, res: Response) => {
//     try { // comment out currently and write test and build frontend first
//       // const openai = new OpenAI({
//       //   apiKey: process.env.GPT_KEY,
//       // })
//       // const chat_completion = await openai.chat.completions.create({
//       //     model: "gpt-3.5-turbo", // we can change to better model
//       //     messages: [{ role: "user", content: req.body.prompt }],
//       // })
//       // console.log(chat_completion.choices) // This is the response as follow
//       gptResponse = [ // chat_completion.choices
//         {
//           index: 0,
//           message: {
//             role: 'assistant',
//             content: 'Title: Unlocking the Mysteries of Relationship Psychology: Building Stronger Bonds\n' +
//               '\n' +
//               'Introduction:\n' +
//               '\n' +
//               'Relationships are a significant aspect of human existence, playing a crucial role in shaping our emotional well-being, sense of belonging, and overall happiness. The complex dynamics within relationships have intrigued psychologists for decades, leading to the development of relationship psychology as a specialized field of study. This branch of psychology aims to understand the underlying principles that drive relationship formation, maintenance, and dissolution. By delving into the intricate workings of human relationships, relationship psychology offers valuable insights that can help individuals foster healthier connections and build stronger bonds with their partners.\n' +
//               '\n' +
//               'Understanding Relationship Psychology:\n' +
//               '\n' +
//               'Relationship psychology focuses on exploring both the conscious and unconscious factors that impact romantic, familial, and friendship relationships. By analyzing interpersonal behaviors, emotions, and cognitive processes, psychologists gain a deeper comprehension of relationship dynamics.\n' +
//               '\n' +
//               '1. Attachment Theory:\n' +
//               "Attachment theory, developed by renowned psychologist John Bowlby, forms the foundation of relationship psychology. It examines how early experiences and attachment styles shape adult relationships. This theory emphasizes the significance of secure attachment in promoting healthy, satisfying relationships. Understanding one's attachment style—whether secure, anxious, or avoidant—can provide invaluable insights into relationship patterns and offer pathways for personal growth.\n" +
//               '\n' +
//               '2. Communication:\n' +
//               'Effective communication plays a vital role in maintaining healthy relationships. Relationship psychology emphasizes the importance of communication styles, active listening, and constructive conflict resolution. Research shows that couples who communicate openly, honestly, and respectfully tend to have more resilient and fulfilling relationships.\n' +
//               '\n' +
//               '3. Love and Attraction:\n' +
//               'Relationship psychology unravels the complexities of love and attraction, shedding light on why specific individuals are drawn to one another. The triangular theory of love, developed by psychologist Robert Sternberg, suggests that love comprises three components: intimacy, passion, and commitment. Understanding these components allows individuals to assess their own relationships and work towards cultivating balanced and fulfilling partnerships.\n' +
//               '\n' +
//               '4. Relationship Satisfaction:\n' +
//               "Numerous factors influence relationship satisfaction, including shared values, compatibility, emotional intimacy, and mutual support. Relationship psychology explores these elements in-depth, unveiling the secrets to maintaining long-lasting and satisfying relationships. Research suggests that shared experiences, effective conflict management, and appreciation for one another's positive qualities contribute significantly to relationship satisfaction.\n" +
//               '\n' +
//               '5. Relationship Dissolution:\n' +
//               'While many relationships flourish over time, others face challenges that can lead to their dissolution. Relationship psychology offers insights into the common factors that contribute to relationship breakdown, including ineffective communication, lack of trust, infidelity, and unresolved conflicts. Understanding the catalysts for relationship dissolution can guide couples towards seeking therapy, helping them navigate challenges and salvage their partnership if desired.\n' +
//               '\n' +
//               'Conclusion:\n' +
//               '\n' +
//               'Relationship psychology shines a light on the intricacies of human connections, providing individuals with the tools and knowledge necessary to build and maintain fulfilling relationships. By gaining a deeper understanding of attachment styles, communication techniques, love and attraction, relationship satisfaction, and the factors contributing to relationship dissolution, individuals can navigate the complexities of their partnerships with greater awareness and intentionality. Whether seeking personal growth or aiming to enhance an existing relationship, relationship psychology offers invaluable insights to foster healthier, stronger bonds with those we cherish.'
//           },
//           finish_reason: 'stop'
//         }
//       ]
//       res.status(200).json({
//         message: gptResponse[0].message
//       })
//     } catch (error) {
//       console.error('Error generating text:', error)
//       return ''
//     }
//   })
// }

// export default gptApis;
