import { ProductReview } from '@/types/review'

export const mockReviews: Record<number, ProductReview[]> = {
  1: [
    {
      id: 1,
      userName: 'Nguyễn Văn A',
      rating: 5,
      comment: 'Sản phẩm rất đẹp, chất lượng tốt. Tôi rất hài lòng!',
      date: '2024-01-15',
    },
    {
      id: 2,
      userName: 'Trần Thị B',
      rating: 4,
      comment: 'Cây đẹp nhưng giá hơi cao một chút.',
      date: '2024-01-10',
    },
  ],
  2: [
    {
      id: 3,
      userName: 'Lê Văn C',
      rating: 5,
      comment: 'Cây Dạ Lam rất đẹp, lá xanh mướt. Đáng giá tiền!',
      date: '2024-01-20',
    },
    {
      id: 4,
      userName: 'Phạm Thị D',
      rating: 4,
      comment: 'Sản phẩm tốt, giao hàng nhanh.',
      date: '2024-01-18',
    },
    {
      id: 5,
      userName: 'Hoàng Văn E',
      rating: 5,
      comment: 'Rất hài lòng với chất lượng sản phẩm.',
      date: '2024-01-12',
    },
  ],
  3: [
    {
      id: 6,
      userName: 'Vũ Thị F',
      rating: 5,
      comment: 'Cây Danh Dự sang trọng, phù hợp làm quà tặng.',
      date: '2024-01-22',
    },
  ],
}

export const getReviewsByProductId = (productId: number): ProductReview[] => {
  return mockReviews[productId] || []
}

