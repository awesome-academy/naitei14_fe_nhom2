export interface ProductDetailData {
  images?: string[]
  shortDescription?: string
  fullDescription?: string
  tags?: string[]
}

export const mockProductDetails: Record<number, ProductDetailData> = {
  1: {
    images: undefined, 
    shortDescription: 'Cây chân chim là loại cây cảnh phổ biến, dễ chăm sóc, thích hợp để trang trí trong nhà và văn phòng.',
    fullDescription: `
      <p><strong>Tên phổ thông:</strong> Cây chân chim, Ngũ gia bì</p>
      <p><strong>Tên khoa học:</strong> Schefflera arboricola</p>
      <p><strong>Họ thực vật:</strong> Araliaceae (Họ Nhân sâm)</p>
      <p><strong>Chiều cao:</strong> 0,5-1,5m</p>
      <p>Cây chân chim có nguồn gốc từ Đài Loan và miền nam Trung Quốc, được du nhập và phân bố rộng khắp ở Việt Nam. Cây phát triển tốt trong môi trường trong nhà, thích hợp với ánh sáng gián tiếp và độ ẩm vừa phải. Lá cây có hình dạng đặc trưng như bàn tay với 5-8 lá chét, màu xanh đậm bóng.</p>
      <p>Cây dễ chăm sóc, không cần tưới nước quá nhiều, phù hợp cho người mới bắt đầu trồng cây cảnh. Cây có khả năng thanh lọc không khí tốt, giúp loại bỏ các chất độc hại trong môi trường sống.</p>
    `,
    tags: ['Cây cảnh', 'Trang trí', 'Cây cảnh trong nhà', 'Dễ chăm sóc'],
  },
  2: {
    images: undefined,
    shortDescription: 'Cây Dạ Lam có lá màu xanh đậm với các đường vân màu trắng kem, tạo không gian xanh mát cho ngôi nhà của bạn.',
    fullDescription: `
      <p><strong>Tên phổ thông:</strong> Dạ lam, Huỳnh tình cảnh, Dong vẫn</p>
      <p><strong>Tên khoa học:</strong> Calathea zebrina</p>
      <p><strong>Họ thực vật:</strong> Marantaceae (Củ dong)</p>
      <p><strong>Chiều cao:</strong> 0,8-1,2m</p>
      <p>Cây dạ lam có nguồn gốc từ Brazil, được du nhập và phân bố rộng khắp ở Việt Nam. Cây có lá hình trứng, rộng 15-20cm, màu xanh đậm với các đường vân màu trắng kem rất đẹp mắt. Mặt dưới lá có màu xanh nhạt hơn.</p>
      <p>Cây ưa bóng râm hoặc ánh sáng gián tiếp, cần độ ẩm cao và đất luôn ẩm. Cây phát triển nhanh, thích hợp để trang trí trong nhà, văn phòng hoặc các không gian có thiết bị tỏa nhiệt. Cây còn có khả năng thanh lọc không khí, giúp môi trường sống trong lành hơn.</p>
    `,
    tags: ['Cây cảnh', 'Trang trí', 'Cây cảnh trong nhà', 'Thanh lọc không khí'],
  },
  3: {
    images: undefined,
    shortDescription: 'Cây Danh Dự với vẻ đẹp sang trọng, phù hợp để làm quà tặng hoặc trang trí phòng khách.',
    fullDescription: `
      <p><strong>Tên phổ thông:</strong> Cây Danh Dự, Cây Huyết dụ</p>
      <p><strong>Tên khoa học:</strong> Cordyline fruticosa</p>
      <p><strong>Họ thực vật:</strong> Asparagaceae (Họ Măng tây)</p>
      <p><strong>Chiều cao:</strong> 1-2m</p>
      <p>Cây Danh Dự có nguồn gốc từ Đông Nam Á và các đảo Thái Bình Dương. Cây có lá dài, màu xanh đậm hoặc đỏ tía, tạo vẻ đẹp sang trọng và quý phái. Cây thường được trồng làm cảnh trong nhà hoặc ngoài trời.</p>
      <p>Cây ưa ánh sáng gián tiếp, cần đất ẩm nhưng không được úng nước. Cây phát triển chậm, phù hợp để trang trí phòng khách, phòng làm việc hoặc làm quà tặng trong các dịp đặc biệt.</p>
    `,
    tags: ['Cây cảnh', 'Trang trí', 'Cây cảnh cao cấp', 'Quà tặng'],
  },
}

export const getProductDetailById = (productId: number): ProductDetailData | null => {
  return mockProductDetails[productId] || null
}

export const generateDefaultProductDetail = (
  productId: number,
  productName: string,
  category?: string,
  description?: string
): ProductDetailData => {
  const existingDetail = mockProductDetails[productId]
  if (existingDetail) {
    return existingDetail
  }

  return {
    images: undefined,
    shortDescription: description || '',
    fullDescription: `
      <p><strong>Tên phổ thông:</strong> ${productName}</p>
      <p><strong>Tên khoa học:</strong> ${productName}</p>
      <p><strong>Họ thực vật:</strong> ${category || 'Cây cảnh'}</p>
      <p><strong>Chiều cao:</strong> 0,8-1,2m</p>
      <p>${description || 'Sản phẩm chất lượng cao, phù hợp cho không gian sống của bạn.'}</p>
      <p>Cây có nguồn gốc từ nhiều nơi trên thế giới, được du nhập và phân bố rộng khắp ở Việt Nam. Cây phát triển tốt trong môi trường trong nhà, thích hợp với ánh sáng gián tiếp và độ ẩm vừa phải.</p>
    `,
    tags: ['Cây cảnh', 'Trang trí', category || 'Phổ biến'],
  }
}

