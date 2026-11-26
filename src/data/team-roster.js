import { faculty } from './faculty.js';

const members = (role, names) => names.map(name => ({ name, role: [role] }));

export const teamGroups = {
  Faculty: faculty,
  Organizers: members('Organizer', ['Pranav Vashisth', 'Samar Goyal', 'Praneel Dev', 'Vedha Sinkar']),
  Heads: [
    ...members('Website Development Head', ['Roodraksh Agrawal']),
    ...members('Sponsorship Head', ['Manan Vaish', 'Kavya Jethani']),
    ...members('Creative Head', ['K Arya Sekhar Das', 'Rutwik Naik', 'Somik Jain', 'Kaustubh Gera']),
    ...members('Social Media Head', ['Aayana Jain']),
    ...members('Event Management Head', ['Adwaiy Mahajan']),
    ...members('Speaker Outreach Head', ['Diksha Sakhi']),
  ],
  Creative: [
    ...members('Graphic Designing', ['Aanya Agarwal', 'Gargi Atrey', 'Aditya Mittal', 'Rehana Sharma', 'Sahil Lulani', 'Naman Rathi', 'Priyam Srivastava', 'Mridul Sharma']),
    ...members('Video Editing', ['Priyanshu Naruka']),
    ...members('Website Development', ['Harshit Lalwani']),
  ],
  Outreach: members('Speaker Outreach', ['Paridhi Goyal', 'Aadish Khurana', 'Girisha Saini', 'Shambhavi Ojha', 'Anugya Mittal', 'Varun Rastogi']),
  Content: members('Content Writing', ['Madhura Vyas', 'Lavanya Gupta', 'Garvit Garg', 'Sanskriti Singh', 'Nehal', 'Aagam Jain']),
  Sponsor: members('Sponsorship', ['Dev Rastogi', 'Anshul Bansal', 'Aditri Bansal', 'Devansh Katariya', 'Krish Kumar']),
  Management: members('Event Management', ['Kavya Bafna', 'Shaurya Agarwal', 'Raghav Khandelwal', 'Dhruv Garg', 'Yugank Maheshwari', 'Ishaan Tandon']),
  'Social Media': members('Social Media', ['Mandira Sarma', 'Yuvraj Sahu']),
};
