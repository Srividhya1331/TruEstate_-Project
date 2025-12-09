const BASE_URL = '/api/sales';

export const fetchSales = async (params) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      query.append(key, value);
    }
  });

  const res = await fetch(`${BASE_URL}?${query}`);
  if (!res.ok) throw new Error('API Error');
  return res.json();
};
