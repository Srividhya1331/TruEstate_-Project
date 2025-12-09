import fs from 'fs';
import csv from 'csv-parser';

const processCSV = async () => {
  const results = [];
  
  fs.createReadStream('data/sales-data.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      const salesData = results.map((row, index) => ({
        id: index + 1,
        customerId: row['Customer ID'] || '',
        customerName: row['Customer Name'] || '',
        phoneNumber: row['Phone Number'] || '',
        gender: row.Gender || '',
        age: parseInt(row.Age || 0),
        customerRegion: row['Customer Region'] || '',
        customerType: row['Customer Type'] || '',
        productId: row['Product ID'] || '',
        productName: row['Product Name'] || '',
        brand: row.Brand || '',
        productCategory: row['Product Category'] || '',
        tags: row.Tags || '',
        quantity: parseInt(row.Quantity || 0),
        pricePerUnit: parseFloat(row['Price per Unit'] || 0),
        discountPercentage: parseFloat(row['Discount Percentage'] || 0),
        totalAmount: parseFloat(row['Total Amount'] || 0),
        finalAmount: parseFloat(row['Final Amount'] || 0),
        date: row.Date || '',
        paymentMethod: row['Payment Method'] || '',
        orderStatus: row['Order Status'] || '',
        deliveryType: row['Delivery Type'] || '',
        storeId: row['Store ID'] || '',
        storeLocation: row['Store Location'] || '',
        salespersonId: row['Salesperson ID'] || '',
        employeeName: row['Employee Name'] || ''
      }));
      
      fs.mkdirSync('backend/data', { recursive: true });
      fs.writeFileSync('backend/data/sales.json', JSON.stringify(salesData, null, 2));
      console.log(`✅ Converted ${salesData.length} records`);
    });
};

processCSV();
