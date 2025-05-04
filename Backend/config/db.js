import { Sequelize } from 'sequelize';

// Directly pass the configuration values here
const sequelize = new Sequelize(
  'hospital_db',      
  'root',            
  'Noopur',          
  {
    host: 'localhost', 
    port: 3306,        
    dialect: 'mysql',  
    logging: false,    
  }
);

export default sequelize;



