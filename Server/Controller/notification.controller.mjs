import { Notification } from "../Model/notification.model.mjs";

export const sendNotification = async (req, res) => {
    try {
      const { name, email, message } = req.body;
  
      
      if (!name || !email || !message) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      
      const newNotification = new Notification({
        name,
        email,
        message,
      });
  
     
      await newNotification.save();
  
      return res.status(200).json({
        message: 'Notification sent successfully',
        notification: newNotification,
      });
    } catch (error) {
      console.error('Error sending notification:', error);
      return res.status(500).json({ message: 'Failed to send notification' });
    }
  };
  
  
 export  const getNotifications = async (req, res) => {
    try {
      const notifications = await Notification.find().sort({ createdAt: -1 }); // 
      return res.status(200).json(notifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      return res.status(500).json({ message: 'Failed to fetch notifications' });
    }
  };
  
 