import salesData from "../../data/sales.json" assert { type: "json" };

export const getAllSales = (options) => {
  let data = [...salesData];

  // Search: Customer Name, Phone Number
  if (options.q) {
    const q = options.q.toLowerCase();
    data = data.filter(item =>
      item.customerName.toLowerCase().includes(q) ||
      item.phoneNumber.toLowerCase().includes(q)
    );
  }

  // Filters
  if (options.region) data = data.filter(item => options.region.split(',').includes(item.customerRegion));
  if (options.gender) data = data.filter(item => options.gender.split(',').includes(item.gender));
  if (options.category) data = data.filter(item => options.category.split(',').includes(item.productCategory));
  if (options.paymentMethod) data = data.filter(item => options.paymentMethod.split(',').includes(item.paymentMethod));
  
  if (options.minAge || options.maxAge) {
    data = data.filter(item => {
      const age = parseInt(item.age);
      return (!options.minAge || age >= parseInt(options.minAge)) &&
             (!options.maxAge || age <= parseInt(options.maxAge));
    });
  }

  // Sorting
  if (options.sortBy) {
    const order = options.sortOrder === 'asc' ? 1 : -1;
    data.sort((a, b) => {
      let valA, valB;
      switch(options.sortBy) {
        case 'date': valA = new Date(a.date); valB = new Date(b.date); break;
        case 'quantity': valA = parseInt(a.quantity); valB = parseInt(b.quantity); break;
        case 'customerName': valA = a.customerName.toLowerCase(); valB = b.customerName.toLowerCase(); break;
        default: return 0;
      }
      return valA > valB ? order : valA < valB ? -order : 0;
    });
  }

  // Pagination
  const page = parseInt(options.page) || 1;
  const limit = parseInt(options.limit) || 10;
  const start = (page - 1) * limit;

  return {
    items: data.slice(start, start + limit),
    total: data.length,
    page,
    totalPages: Math.ceil(data.length / limit)
  };
};
