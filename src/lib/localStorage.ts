// localStorage utilities สำหรับจัดการข้อมูล
export interface User {
    id: string
    email: string
    username: string
    password: string
    firstName: string
    lastName: string
    birthdate: string
    idCard: string
    phone: string
    gender: string
    interestedGender: string
    type: 'customer' | 'provider'
    img: string
    joined: string
    verified: boolean
}

export interface Service {
    id: string
    providerId: string
    name: string
    description: string
    categories: string[]
    priceHour: number
    priceDay: number
    images: string[]
    rating: number
    reviewCount: number
    bookingCount: number
    active: boolean
    createdAt: string
}

export interface Review {
    id: string
    serviceId: string
    customerId: string
    rating: number
    comment: string
    createdAt: string
    bookingId?: string
}

export interface Booking {
    id: string
    customerId: string
    providerId: string
    serviceId: string
    serviceName: string
    date: string
    startTime: string
    endTime: string
    totalHours: number
    totalAmount: number
    depositAmount: number
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
    paymentStatus: 'pending' | 'paid' | 'refunded' | 'partially_refunded'
    specialRequests?: string
    cancelledBy?: 'customer' | 'provider'
    refundAmount?: number
    createdAt: string
    updatedAt: string
}

export interface Payment {
    id: string
    bookingId: string
    customerId: string
    providerId: string
    amount: number
    paymentMethod: 'credit_card' | 'promptpay' | 'bank_transfer'
    status:
        | 'pending'
        | 'completed'
        | 'failed'
        | 'refunded'
        | 'partially_refunded'
    transactionId?: string
    refundAmount?: number
    refundReason?: string
    createdAt: string
    completedAt?: string
    refundedAt?: string
}

export interface Transaction {
    id: string
    userId: string
    type:
        | 'earning'
        | 'payment'
        | 'refund'
        | 'withdrawal'
        | 'topup'
        | 'commission'
    amount: number
    description: string
    bookingId?: string
    paymentId?: string
    withdrawalId?: string
    status: 'pending' | 'completed' | 'failed'
    createdAt: string
}

export interface Withdrawal {
    id: string
    userId: string
    amount: number
    bankName: string
    accountNumber: string
    accountName: string
    status: 'pending' | 'completed' | 'failed'
    requestedAt: string
    completedAt?: string
    failureReason?: string
}

export interface UserBalance {
    userId: string
    balance: number
    pendingEarnings: number
    totalEarnings: number
    totalSpent: number
    lastUpdated: string
}

// Keys สำหรับ localStorage
const USERS_KEY = 'rental_girlfriend_users'
const SERVICES_KEY = 'rental_girlfriend_services'
const REVIEWS_KEY = 'rental_girlfriend_reviews'
const CURRENT_USER_KEY = 'rental_girlfriend_current_user'
const BOOKINGS_KEY = 'rental_girlfriend_bookings'
const PAYMENTS_KEY = 'rental_girlfriend_payments'
const TRANSACTIONS_KEY = 'rental_girlfriend_transactions'
const BALANCES_KEY = 'rental_girlfriend_balances'
const WITHDRAWALS_KEY = 'rental_girlfriend_withdrawals'

// Helper functions
export const getUsers = (): User[] => {
    if (typeof window === 'undefined') return []
    const users = localStorage.getItem(USERS_KEY)
    return users ? (JSON.parse(users) as User[]) : []
}

export const setUsers = (users: User[]): void => {
    if (typeof window === 'undefined') return
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export const getServices = (): Service[] => {
    if (typeof window === 'undefined') return []
    const services = localStorage.getItem(SERVICES_KEY)
    return services ? (JSON.parse(services) as Service[]) : []
}

export const setServices = (services: Service[]): void => {
    if (typeof window === 'undefined') return
    localStorage.setItem(SERVICES_KEY, JSON.stringify(services))
}

export const getReviews = (): Review[] => {
    if (typeof window === 'undefined') return []
    const reviews = localStorage.getItem(REVIEWS_KEY)
    return reviews ? (JSON.parse(reviews) as Review[]) : []
}

export const setReviews = (reviews: Review[]): void => {
    if (typeof window === 'undefined') return
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews))
}

export const getCurrentUser = (): User | null => {
    if (typeof window === 'undefined') return null
    const user = localStorage.getItem(CURRENT_USER_KEY)
    return user ? (JSON.parse(user) as User) : null
}

export const setCurrentUser = (user: User | null): void => {
    if (typeof window === 'undefined') return
    if (user) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
    } else {
        localStorage.removeItem(CURRENT_USER_KEY)
    }
}

// Booking management functions
export const getBookings = (): Booking[] => {
    if (typeof window === 'undefined') return []
    const bookings = localStorage.getItem(BOOKINGS_KEY)
    return bookings ? (JSON.parse(bookings) as Booking[]) : []
}

export const setBookings = (bookings: Booking[]): void => {
    if (typeof window === 'undefined') return
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings))
}

// Payment management functions
export const getPayments = (): Payment[] => {
    if (typeof window === 'undefined') return []
    const payments = localStorage.getItem(PAYMENTS_KEY)
    return payments ? (JSON.parse(payments) as Payment[]) : []
}

export const setPayments = (payments: Payment[]): void => {
    if (typeof window === 'undefined') return
    localStorage.setItem(PAYMENTS_KEY, JSON.stringify(payments))
}

// Transaction management functions
export const getTransactions = (): Transaction[] => {
    if (typeof window === 'undefined') return []
    const transactions = localStorage.getItem(TRANSACTIONS_KEY)
    return transactions ? (JSON.parse(transactions) as Transaction[]) : []
}

export const setTransactions = (transactions: Transaction[]): void => {
    if (typeof window === 'undefined') return
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions))
}

// Balance management functions
export const getBalances = (): UserBalance[] => {
    if (typeof window === 'undefined') return []
    const balances = localStorage.getItem(BALANCES_KEY)
    return balances ? (JSON.parse(balances) as UserBalance[]) : []
}

export const setBalances = (balances: UserBalance[]): void => {
    if (typeof window === 'undefined') return
    localStorage.setItem(BALANCES_KEY, JSON.stringify(balances))
}

// Withdrawal management functions
export const getWithdrawals = (): Withdrawal[] => {
    if (typeof window === 'undefined') return []
    const withdrawals = localStorage.getItem(WITHDRAWALS_KEY)
    return withdrawals ? (JSON.parse(withdrawals) as Withdrawal[]) : []
}

export const setWithdrawals = (withdrawals: Withdrawal[]): void => {
    if (typeof window === 'undefined') return
    localStorage.setItem(WITHDRAWALS_KEY, JSON.stringify(withdrawals))
}

// User management functions
export const registerUser = (
    userData: Omit<User, 'id' | 'joined' | 'verified'>
): User => {
    const users = getUsers()

    // ตรวจสอบอีเมลซ้ำ
    if (users.find((u) => u.email === userData.email)) {
        throw new Error('อีเมลนี้ถูกใช้งานแล้ว')
    }

    // ตรวจสอบ username ซ้ำ
    if (users.find((u) => u.username === userData.username)) {
        throw new Error('ชื่อผู้ใช้นี้ถูกใช้งานแล้ว')
    }

    const newUser: User = {
        ...userData,
        id: Date.now().toString(),
        joined: new Date().getFullYear().toString(),
        verified: true,
    }

    users.push(newUser)
    setUsers(users)

    return newUser
}

export const loginUser = (email: string, password: string): User => {
    const users = getUsers()
    const user = users.find((u) => u.email === email && u.password === password)

    if (!user) {
        throw new Error('อีเมลหรือรหัสผ่านไม่ถูกต้อง')
    }

    setCurrentUser(user)
    return user
}

export const logoutUser = (): void => {
    setCurrentUser(null)
}

// Update user information
export const updateUser = (userId: string, updates: Partial<User>): User => {
    const users = getUsers()
    const userIndex = users.findIndex((u) => u.id === userId)

    if (userIndex === -1) {
        throw new Error('ไม่พบผู้ใช้ที่ต้องการแก้ไข')
    }

    const currentUser = users[userIndex]!

    // ตรวจสอบอีเมลซ้ำ (ถ้ามีการอัปเดตอีเมล)
    if (updates.email && updates.email !== currentUser.email) {
        const emailExists = users.find(
            (u) => u.email === updates.email && u.id !== userId
        )
        if (emailExists) {
            throw new Error('อีเมลนี้ถูกใช้งานแล้ว')
        }
    }

    // ตรวจสอบ username ซ้ำ (ถ้ามีการอัปเดต username)
    if (updates.username && updates.username !== currentUser.username) {
        const usernameExists = users.find(
            (u) => u.username === updates.username && u.id !== userId
        )
        if (usernameExists) {
            throw new Error('ชื่อผู้ใช้นี้ถูกใช้งานแล้ว')
        }
    }

    const updatedUser = { ...currentUser, ...updates }
    const updatedUsers = [...users]
    updatedUsers[userIndex] = updatedUser
    setUsers(updatedUsers)

    // อัปเดต current user ด้วย (ถ้าเป็นผู้ใช้ปัจจุบัน)
    const loggedInUser = getCurrentUser()
    if (loggedInUser && loggedInUser.id === userId) {
        setCurrentUser(updatedUser)
    }

    return updatedUser
}

// Delete user account and all related data
export const deleteUserAccount = (
    userId: string,
    password: string
): boolean => {
    const users = getUsers()
    const user = users.find((u) => u.id === userId)

    if (!user || user.password !== password) {
        throw new Error('รหัสผ่านไม่ถูกต้อง')
    }

    // Delete all user's services (if provider)
    deleteAllUserServices(userId)

    // Delete all user's reviews
    deleteAllUserReviews(userId)

    // Remove user from users array
    const updatedUsers = users.filter((u) => u.id !== userId)
    setUsers(updatedUsers)

    // Logout user
    logoutUser()

    return true
}

// Delete all services created by a user
export const deleteAllUserServices = (userId: string): void => {
    const services = getServices()
    const updatedServices = services.filter(
        (service) => service.providerId !== userId
    )
    setServices(updatedServices)
}

// Delete all reviews written by a user
export const deleteAllUserReviews = (userId: string): void => {
    const reviews = getReviews()
    const updatedReviews = reviews.filter(
        (review) => review.customerId !== userId
    )
    setReviews(updatedReviews)

    // Also need to update service ratings after removing reviews
    updateAllServiceRatings()
}

// Recalculate ratings for all services after review deletion
const updateAllServiceRatings = (): void => {
    const services = getServices()
    const reviews = getReviews()

    const updatedServices = services.map((service) => {
        const serviceReviews = reviews.filter(
            (review) => review.serviceId === service.id
        )

        if (serviceReviews.length === 0) {
            return {
                ...service,
                rating: 0,
                reviewCount: 0,
            }
        }

        const totalRating = serviceReviews.reduce(
            (sum, review) => sum + review.rating,
            0
        )
        const averageRating = totalRating / serviceReviews.length

        return {
            ...service,
            rating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
            reviewCount: serviceReviews.length,
        }
    })

    setServices(updatedServices)
}

// Service management functions
export const createService = (
    serviceData: Omit<
        Service,
        'id' | 'rating' | 'reviewCount' | 'bookingCount' | 'createdAt'
    >
): Service => {
    const services = getServices()

    const newService: Service = {
        ...serviceData,
        id: Date.now().toString(),
        rating: 0,
        reviewCount: 0,
        bookingCount: 0,
        createdAt: new Date().toISOString(),
    }

    services.push(newService)
    setServices(services)

    return newService
}

export const updateService = (
    serviceId: string,
    updates: Partial<Service>
): Service => {
    const services = getServices()
    const index = services.findIndex((s) => s.id === serviceId)

    if (index === -1) {
        throw new Error('ไม่พบบริการที่ต้องการแก้ไข')
    }

    const updatedService = { ...services[index], ...updates } as Service
    services[index] = updatedService
    setServices(services)

    return updatedService
}

export const deleteService = (serviceId: string): void => {
    const services = getServices()
    const filteredServices = services.filter((s) => s.id !== serviceId)
    setServices(filteredServices)
}

export const getServicesByProvider = (providerId: string): Service[] => {
    const services = getServices()
    return services.filter((s) => s.providerId === providerId)
}

export const getServicesByCategory = (category: string): Service[] => {
    const services = getServices()
    return services.filter((s) => s.categories.includes(category) && s.active)
}

// Booking management functions
export const createBooking = (
    bookingData: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>
): Booking => {
    const bookings = getBookings()

    const newBooking: Booking = {
        ...bookingData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }

    bookings.push(newBooking)
    setBookings(bookings)

    return newBooking
}

export const updateBooking = (
    bookingId: string,
    updates: Partial<Booking>
): Booking => {
    const bookings = getBookings()
    const index = bookings.findIndex((b) => b.id === bookingId)

    if (index === -1) {
        throw new Error('ไม่พบการจองที่ต้องการแก้ไข')
    }

    const updatedBooking = {
        ...bookings[index],
        ...updates,
        updatedAt: new Date().toISOString(),
    } as Booking

    bookings[index] = updatedBooking
    setBookings(bookings)

    return updatedBooking
}

export const getBookingById = (bookingId: string): Booking | null => {
    const bookings = getBookings()
    return bookings.find((b) => b.id === bookingId) ?? null
}

export const getBookingsByCustomer = (customerId: string): Booking[] => {
    const bookings = getBookings()
    return bookings.filter((b) => b.customerId === customerId)
}

export const getBookingsByProvider = (providerId: string): Booking[] => {
    const bookings = getBookings()
    return bookings.filter((b) => b.providerId === providerId)
}

export const getBookingsByService = (serviceId: string): Booking[] => {
    const bookings = getBookings()
    return bookings.filter((b) => b.serviceId === serviceId)
}

// Review management functions
export const addReview = (
    reviewData: Omit<Review, 'id' | 'createdAt'>
): Review => {
    const reviews = getReviews()

    const newReview: Review = {
        ...reviewData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
    }

    reviews.push(newReview)
    setReviews(reviews)

    // อัปเดตคะแนนเฉลี่ยของบริการ
    updateServiceRating(reviewData.serviceId)

    return newReview
}

export const updateServiceRating = (serviceId: string): void => {
    const reviews = getReviews()
    const serviceReviews = reviews.filter((r) => r.serviceId === serviceId)

    if (serviceReviews.length === 0) return

    const avgRating =
        serviceReviews.reduce((sum, r) => sum + r.rating, 0) /
        serviceReviews.length

    updateService(serviceId, {
        rating: Math.round(avgRating * 10) / 10, // ปัดเศษ 1 ตำแหน่ง
        reviewCount: serviceReviews.length,
    })
}

export const getReviewByBooking = (bookingId: string): Review | null => {
    const reviews = getReviews()
    return reviews.find((r) => r.bookingId === bookingId) ?? null
}

export const getReviewByServiceAndCustomer = (
    serviceId: string,
    customerId: string
): Review | null => {
    const reviews = getReviews()
    return (
        reviews.find(
            (r) => r.serviceId === serviceId && r.customerId === customerId
        ) ?? null
    )
}

// Payment management functions
export const createPayment = (
    paymentData: Omit<Payment, 'id' | 'createdAt'>
): Payment => {
    const payments = getPayments()

    const newPayment: Payment = {
        ...paymentData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
    }

    payments.push(newPayment)
    setPayments(payments)

    return newPayment
}

export const updatePayment = (
    paymentId: string,
    updates: Partial<Payment>
): Payment => {
    const payments = getPayments()
    const index = payments.findIndex((p) => p.id === paymentId)

    if (index === -1) {
        throw new Error('ไม่พบการชำระเงินที่ต้องการแก้ไข')
    }

    const updatedPayment = { ...payments[index], ...updates } as Payment
    payments[index] = updatedPayment
    setPayments(payments)

    return updatedPayment
}

export const getPaymentById = (paymentId: string): Payment | null => {
    const payments = getPayments()
    return payments.find((p) => p.id === paymentId) ?? null
}

export const getPaymentsByBooking = (bookingId: string): Payment[] => {
    const payments = getPayments()
    return payments.filter((p) => p.bookingId === bookingId)
}

export const getPaymentsByUser = (userId: string): Payment[] => {
    const payments = getPayments()
    return payments.filter(
        (p) => p.customerId === userId || p.providerId === userId
    )
}

// Transaction management functions
export const createTransaction = (
    transactionData: Omit<Transaction, 'id' | 'createdAt'>
): Transaction => {
    const transactions = getTransactions()

    // Generate unique ID using timestamp + random number to prevent duplicates
    const uniqueId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    const newTransaction: Transaction = {
        ...transactionData,
        id: uniqueId,
        createdAt: new Date().toISOString(),
    }

    transactions.push(newTransaction)
    setTransactions(transactions)

    return newTransaction
}

export const getTransactionsByUser = (userId: string): Transaction[] => {
    const transactions = getTransactions()
    return transactions.filter((t) => t.userId === userId)
}

export const getTransactionsByDateRange = (
    userId: string,
    startDate: string,
    endDate: string
): Transaction[] => {
    const transactions = getTransactionsByUser(userId)
    return transactions.filter((t) => {
        const transactionDate = new Date(t.createdAt)
        return (
            transactionDate >= new Date(startDate) &&
            transactionDate <= new Date(endDate)
        )
    })
}

// Balance management functions
export const getUserBalance = (userId: string): UserBalance => {
    const balances = getBalances()
    const existingBalance = balances.find((b) => b.userId === userId)

    if (existingBalance) {
        return existingBalance
    }

    // Create new balance record if doesn't exist
    const newBalance: UserBalance = {
        userId,
        balance: 0,
        pendingEarnings: 0,
        totalEarnings: 0,
        totalSpent: 0,
        lastUpdated: new Date().toISOString(),
    }

    balances.push(newBalance)
    setBalances(balances)

    return newBalance
}

export const updateUserBalance = (
    userId: string,
    updates: Partial<Omit<UserBalance, 'userId'>>
): UserBalance => {
    const balances = getBalances()
    const index = balances.findIndex((b) => b.userId === userId)

    if (index === -1) {
        // Create new balance if doesn't exist
        const newBalance: UserBalance = {
            userId,
            balance: 0,
            pendingEarnings: 0,
            totalEarnings: 0,
            totalSpent: 0,
            lastUpdated: new Date().toISOString(),
            ...updates,
        }
        balances.push(newBalance)
        setBalances(balances)
        return newBalance
    }

    const updatedBalance = {
        ...balances[index],
        ...updates,
        lastUpdated: new Date().toISOString(),
    } as UserBalance

    balances[index] = updatedBalance
    setBalances(balances)

    return updatedBalance
}

export const addToUserBalance = (
    userId: string,
    amount: number
): UserBalance => {
    const currentBalance = getUserBalance(userId)
    return updateUserBalance(userId, {
        balance: currentBalance.balance + amount,
    })
}

export const deductFromUserBalance = (
    userId: string,
    amount: number
): UserBalance => {
    const currentBalance = getUserBalance(userId)
    if (currentBalance.balance < amount) {
        throw new Error('ยอดเงินในบัญชีไม่เพียงพอ')
    }
    return updateUserBalance(userId, {
        balance: currentBalance.balance - amount,
        totalSpent: currentBalance.totalSpent + amount,
    })
}

// Process booking completion and handle payments
export const completeBookingPayment = (bookingId: string): void => {
    const booking = getBookingById(bookingId)
    if (!booking) {
        throw new Error('ไม่พบการจองที่ต้องการ')
    }

    // Update booking status
    updateBooking(bookingId, {
        status: 'completed',
        paymentStatus: 'paid',
    })

    // Calculate commission (10% platform fee)
    const platformCommission = Math.floor(booking.totalAmount * 0.1)
    const providerEarning = booking.totalAmount - platformCommission

    // Add earning to provider
    const providerBalance = getUserBalance(booking.providerId)
    updateUserBalance(booking.providerId, {
        balance: providerBalance.balance + providerEarning,
        totalEarnings: providerBalance.totalEarnings + providerEarning,
    })

    // Create transactions
    createTransaction({
        userId: booking.providerId,
        type: 'earning',
        amount: providerEarning,
        description: `รายได้จากการให้บริการ - ${booking.serviceName}`,
        bookingId: booking.id,
        status: 'completed',
    })

    createTransaction({
        userId: booking.providerId,
        type: 'commission',
        amount: -platformCommission,
        description: `ค่าคอมมิชชั่นแพลตฟอร์ม (10%) - ${booking.serviceName}`,
        bookingId: booking.id,
        status: 'completed',
    })

    createTransaction({
        userId: booking.customerId,
        type: 'payment',
        amount: -booking.totalAmount,
        description: `ชำระค่าบริการ - ${booking.serviceName}`,
        bookingId: booking.id,
        status: 'completed',
    })
}

// Process booking cancellation and handle refunds
export const cancelBookingWithRefund = (
    bookingId: string,
    cancelledBy: 'customer' | 'provider',
    reason?: string
): void => {
    const booking = getBookingById(bookingId)
    if (!booking) {
        throw new Error('ไม่พบการจองที่ต้องการ')
    }

    if (booking.status === 'cancelled') {
        throw new Error('การจองนี้ถูกยกเลิกแล้ว')
    }

    if (booking.paymentStatus !== 'paid') {
        throw new Error('ไม่สามารถยกเลิกการจองที่ยังไม่ได้ชำระเงินได้')
    }

    let refundToCustomer = 0
    let refundToProvider = 0
    let paymentStatus: 'refunded' | 'partially_refunded' = 'refunded'

    if (cancelledBy === 'customer') {
        // Customer cancellation: 50% to customer, 50% to provider
        refundToCustomer = Math.floor(booking.totalAmount * 0.5)
        refundToProvider = booking.totalAmount - refundToCustomer
        paymentStatus = 'partially_refunded'
    } else {
        // Provider cancellation: 100% to customer
        refundToCustomer = booking.totalAmount
        refundToProvider = 0
        paymentStatus = 'refunded'
    }

    // Update booking
    updateBooking(bookingId, {
        status: 'cancelled',
        paymentStatus,
        cancelledBy,
        refundAmount: refundToCustomer,
    })

    // Update payment record
    const payments = getPaymentsByBooking(bookingId)
    if (payments.length > 0) {
        const payment = payments[0]!
        updatePayment(payment.id, {
            status: paymentStatus,
            refundAmount: refundToCustomer,
            refundReason:
                reason ??
                `ยกเลิกโดย${cancelledBy === 'customer' ? 'ลูกค้า' : 'ผู้ให้บริการ'}`,
            refundedAt: new Date().toISOString(),
        })
    }

    // Process refunds
    if (refundToCustomer > 0) {
        // Refund to customer
        const customerBalance = getUserBalance(booking.customerId)
        updateUserBalance(booking.customerId, {
            balance: customerBalance.balance + refundToCustomer,
        })

        createTransaction({
            userId: booking.customerId,
            type: 'refund',
            amount: refundToCustomer,
            description: `คืนเงิน - ${booking.serviceName} (ยกเลิกโดย${cancelledBy === 'customer' ? 'ลูกค้า' : 'ผู้ให้บริการ'})`,
            bookingId: booking.id,
            status: 'completed',
        })
    }

    if (refundToProvider > 0) {
        // Payment to provider (in case of customer cancellation)
        const providerBalance = getUserBalance(booking.providerId)
        const platformCommission = Math.floor(refundToProvider * 0.1)
        const providerEarning = refundToProvider - platformCommission

        updateUserBalance(booking.providerId, {
            balance: providerBalance.balance + providerEarning,
            totalEarnings: providerBalance.totalEarnings + providerEarning,
        })

        createTransaction({
            userId: booking.providerId,
            type: 'earning',
            amount: providerEarning,
            description: `รายได้จากการยกเลิกของลูกค้า - ${booking.serviceName}`,
            bookingId: booking.id,
            status: 'completed',
        })

        if (platformCommission > 0) {
            createTransaction({
                userId: booking.providerId,
                type: 'commission',
                amount: -platformCommission,
                description: `ค่าคอมมิชชั่นแพลตฟอร์ม (10%) - ${booking.serviceName}`,
                bookingId: booking.id,
                status: 'completed',
            })
        }
    }
}

// Create booking after successful payment
export const createBookingAfterPayment = (
    bookingData: Omit<
        Booking,
        'id' | 'createdAt' | 'updatedAt' | 'paymentStatus'
    >,
    paymentData: Omit<Payment, 'id' | 'createdAt' | 'bookingId'>
): { booking: Booking; payment: Payment } => {
    // Create booking with paid status
    const booking = createBooking({
        ...bookingData,
        paymentStatus: 'paid',
    })

    // Create payment record
    const payment = createPayment({
        ...paymentData,
        bookingId: booking.id,
    })

    // Create transaction record for customer
    createTransaction({
        userId: booking.customerId,
        type: 'payment',
        amount: -booking.totalAmount,
        description: `ชำระเงิน - ${booking.serviceName}`,
        bookingId: booking.id,
        paymentId: payment.id,
        status: 'completed',
    })

    return { booking, payment }
}

// Withdrawal functions
export const createWithdrawal = (
    withdrawalData: Omit<Withdrawal, 'id' | 'requestedAt'>
): Withdrawal => {
    const withdrawals = getWithdrawals()

    const newWithdrawal: Withdrawal = {
        ...withdrawalData,
        id: Date.now().toString(),
        requestedAt: new Date().toISOString(),
    }

    withdrawals.push(newWithdrawal)
    setWithdrawals(withdrawals)

    return newWithdrawal
}

export const processWithdrawal = (
    userId: string,
    amount: number,
    bankName: string,
    accountNumber: string,
    accountName: string
): Withdrawal => {
    // Check if user has sufficient balance
    const userBalance = getUserBalance(userId)
    if (userBalance.balance < amount) {
        throw new Error('ยอดเงินในบัญชีไม่เพียงพอสำหรับการถอน')
    }

    // Minimum withdrawal amount
    if (amount < 100) {
        throw new Error('จำนวนเงินขั้นต่ำในการถอนคือ ฿100')
    }

    // Create withdrawal request
    const withdrawal = createWithdrawal({
        userId,
        amount,
        bankName,
        accountNumber,
        accountName,
        status: 'completed', // For demo purposes, auto-complete
        completedAt: new Date().toISOString(),
    })

    // Deduct from user balance
    updateUserBalance(userId, {
        balance: userBalance.balance - amount,
    })

    // Create transaction record
    createTransaction({
        userId,
        type: 'withdrawal',
        amount: -amount,
        description: `ถอนเงินไปยัง ${bankName} (${accountNumber})`,
        withdrawalId: withdrawal.id,
        status: 'completed',
    })

    return withdrawal
}

export const getWithdrawalsByUser = (userId: string): Withdrawal[] => {
    const withdrawals = getWithdrawals()
    return withdrawals.filter((w) => w.userId === userId)
}

// Top up balance function
export const topUpBalance = (userId: string, amount: number): void => {
    if (amount <= 0) {
        throw new Error('จำนวนเงินต้องมากกว่า 0')
    }

    const userBalance = getUserBalance(userId)
    updateUserBalance(userId, {
        balance: userBalance.balance + amount,
    })

    createTransaction({
        userId,
        type: 'topup',
        amount,
        description: `เติมเงินเข้าบัญชี`,
        status: 'completed',
    })
}

// Enhanced transaction history with filtering
export const getTransactionHistory = (
    userId: string,
    filters?: {
        type?: Transaction['type']
        startDate?: string
        endDate?: string
        limit?: number
    }
): Transaction[] => {
    let transactions = getTransactionsByUser(userId)

    if (filters?.type) {
        transactions = transactions.filter((t) => t.type === filters.type)
    }

    if (filters?.startDate) {
        transactions = transactions.filter(
            (t) => new Date(t.createdAt) >= new Date(filters.startDate!)
        )
    }

    if (filters?.endDate) {
        transactions = transactions.filter(
            (t) => new Date(t.createdAt) <= new Date(filters.endDate!)
        )
    }

    // Sort by date (newest first)
    transactions.sort(
        (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    if (filters?.limit) {
        transactions = transactions.slice(0, filters.limit)
    }

    return transactions
}

// Pay with wallet balance
export const payWithWallet = (
    userId: string,
    amount: number,
    description: string,
    bookingId?: string
): void => {
    const userBalance = getUserBalance(userId)
    if (userBalance.balance < amount) {
        throw new Error('ยอดเงินในกระเป๋าไม่เพียงพอ')
    }

    // Deduct from balance
    updateUserBalance(userId, {
        balance: userBalance.balance - amount,
        totalSpent: userBalance.totalSpent + amount,
    })

    // Create transaction record
    createTransaction({
        userId,
        type: 'payment',
        amount: -amount,
        description,
        bookingId,
        status: 'completed',
    })
}

// Initialize sample data
export const initializeSampleData = (): void => {
    if (typeof window === 'undefined') return

    // ตรวจสอบว่ามีข้อมูลอยู่แล้วหรือไม่
    if (getUsers().length > 0) return

    // สร้างข้อมูลผู้ใช้ตัวอย่าง
    const sampleUsers: User[] = [
        {
            id: '1',
            email: 'provider1@example.com',
            username: 'jenny_cute',
            password: '123456',
            firstName: 'เจนนี่',
            lastName: 'สวยงาม',
            birthdate: '1998-05-15',
            idCard: '1-1234-56789-12-3',
            phone: '089-123-4567',
            gender: 'หญิง',
            interestedGender: 'ชาย',
            type: 'provider',
            img: '/img/provider1.png',
            joined: '2024',
            verified: true,
        },
        {
            id: '2',
            email: 'provider2@example.com',
            username: 'bow_lovely',
            password: '123456',
            firstName: 'โบว์',
            lastName: 'น่ารัก',
            birthdate: '1999-08-22',
            idCard: '1-2345-67890-23-4',
            phone: '089-234-5678',
            gender: 'หญิง',
            interestedGender: 'ชาย',
            type: 'provider',
            img: '/img/provider2.png',
            joined: '2024',
            verified: true,
        },
        {
            id: '3',
            email: 'provider3@example.com',
            username: 'mint_sweet',
            password: '123456',
            firstName: 'มิ้นต์',
            lastName: 'หวานใจ',
            birthdate: '1997-12-10',
            idCard: '1-3456-78901-34-5',
            phone: '089-345-6789',
            gender: 'หญิง',
            interestedGender: 'ชาย',
            type: 'provider',
            img: '/img/provider3.png',
            joined: '2023',
            verified: true,
        },
        {
            id: '4',
            email: 'customer1@example.com',
            username: 'somchai_user',
            password: '123456',
            firstName: 'สมชาย',
            lastName: 'ใจดี',
            birthdate: '1995-03-20',
            idCard: '1-4567-89012-45-6',
            phone: '089-456-7890',
            gender: 'ชาย',
            interestedGender: 'หญิง',
            type: 'customer',
            img: '/img/p1.jpg',
            joined: '2024',
            verified: true,
        },
    ]

    // สร้างข้อมูลบริการตัวอย่าง
    const sampleServices: Service[] = [
        {
            id: '1',
            providerId: '1',
            name: 'เดทดูหนังโรแมนติก',
            description:
                'เจนค่ะ เจนค่ะ หนูชื่อเจนมากับบูมแล้วก็มากับโบว์ โบว์ค่ะ โบว์ค่ะ หนูชื่อโบว์มากับบูม แล้วก็มากับเจน นุ่มค่ะ นุ่มค่ะ...',
            categories: ['เดท/คู่เดท', 'ดูหนัง'],
            priceHour: 500,
            priceDay: 3000,
            images: ['/img/provider1.png'],
            rating: 4.8,
            reviewCount: 127,
            bookingCount: 145,
            active: true,
            createdAt: '2024-01-15T10:00:00Z',
        },
        {
            id: '2',
            providerId: '2',
            name: 'ช้อปปิ้งและทานอาหาร',
            description:
                'โบว์พร้อมไปช้อปปิ้งและหาอะไรอร่อยๆ กินกันค่ะ รับรองสนุกแน่นอน มีประสบการณ์ช้อปปิ้งมากมาย',
            categories: ['ช้อปปิ้ง', 'ทานอาหาร', 'เพื่อนร่วมกิจกรรม'],
            priceHour: 450,
            priceDay: 2800,
            images: ['/img/provider2.png'],
            rating: 4.9,
            reviewCount: 89,
            bookingCount: 112,
            active: true,
            createdAt: '2024-02-01T14:30:00Z',
        },
        {
            id: '3',
            providerId: '3',
            name: 'ถ่ายรูปและเดินเล่น',
            description:
                'มิ้นต์ชอบถ่ายรูปและเดินเล่นในสถานที่สวยๆ ค่ะ มาสร้างความทรงจำดีๆ ไปด้วยกันนะคะ',
            categories: ['ถ่ายรูป', 'เดินเล่น', 'ท่องเที่ยว'],
            priceHour: 550,
            priceDay: 3200,
            images: ['/img/provider3.png'],
            rating: 4.7,
            reviewCount: 156,
            bookingCount: 203,
            active: true,
            createdAt: '2024-01-20T09:15:00Z',
        },
        {
            id: '4',
            providerId: '1',
            name: 'งานสังคมและปาร์ตี้',
            description:
                'เหมาะสำหรับงานสังคม งานปาร์ตี้ หรือกิจกรรมต่างๆ ที่ต้องการเพื่อนร่วมงาน',
            categories: ['งานสังคม', 'เพื่อนร่วมกิจกรรม'],
            priceHour: 600,
            priceDay: 3500,
            images: ['/img/provider1.png'],
            rating: 4.6,
            reviewCount: 78,
            bookingCount: 95,
            active: true,
            createdAt: '2024-02-10T16:45:00Z',
        },
        {
            id: '5',
            providerId: '2',
            name: 'คอนเสิร์ตและกิจกรรมกีฬา',
            description: 'ชอบดูคอนเสิร์ตและกิจกรรมกีฬาต่างๆ มาสนุกไปด้วยกันค่ะ',
            categories: ['คอนเสิร์ต', 'กีฬา', 'เพื่อนร่วมกิจกรรม'],
            priceHour: 480,
            priceDay: 2900,
            images: ['/img/provider2.png'],
            rating: 4.8,
            reviewCount: 134,
            bookingCount: 167,
            active: true,
            createdAt: '2024-01-25T11:20:00Z',
        },
    ]

    // สร้างข้อมูลรีวิวตัวอย่าง
    const sampleReviews: Review[] = [
        {
            id: '1',
            serviceId: '1',
            customerId: '4',
            rating: 5,
            comment: 'บริการดีมาก เจนน่ารักและเป็นกันเองมาก',
            createdAt: '2024-02-15T10:30:00Z',
        },
        {
            id: '2',
            serviceId: '2',
            customerId: '4',
            rating: 5,
            comment: 'โบว์ช่วยเลือกของได้ดีมาก แนะนำร้านอาหารอร่อยด้วย',
            createdAt: '2024-02-20T15:45:00Z',
        },
    ]

    // สร้างข้อมูลการจองตัวอย่าง
    const sampleBookings: Booking[] = [
        {
            id: '1',
            customerId: '4',
            providerId: '1',
            serviceId: '1',
            serviceName: 'เดทดูหนังโรแมนติก',
            date: '2024-12-25',
            startTime: '19:00',
            endTime: '22:00',
            totalHours: 3,
            totalAmount: 1500,
            depositAmount: 750,
            status: 'confirmed',
            paymentStatus: 'paid',
            specialRequests: 'อยากดูหนังแอคชั่น ขอหนังที่มีซับไตเติลภาษาไทย',
            createdAt: '2024-12-20T10:00:00Z',
            updatedAt: '2024-12-20T10:00:00Z',
        },
        {
            id: '2',
            customerId: '4',
            providerId: '2',
            serviceId: '2',
            serviceName: 'ช้อปปิ้งและทานอาหาร',
            date: '2024-12-30',
            startTime: '14:00',
            endTime: '18:00',
            totalHours: 4,
            totalAmount: 1800,
            depositAmount: 900,
            status: 'pending',
            paymentStatus: 'paid',
            specialRequests: 'อยากไปห้างสยามพารากอน และทานอาหารญี่ปุ่น',
            createdAt: '2024-12-22T15:30:00Z',
            updatedAt: '2024-12-22T15:30:00Z',
        },
        {
            id: '3',
            customerId: '4',
            providerId: '3',
            serviceId: '3',
            serviceName: 'ถ่ายรูปและเดินเล่น',
            date: '2024-12-15',
            startTime: '10:00',
            endTime: '16:00',
            totalHours: 6,
            totalAmount: 3300,
            depositAmount: 1650,
            status: 'completed',
            paymentStatus: 'paid',
            specialRequests:
                'อยากถ่ายรูปที่สวนลุมพินี และเดินเล่นที่ตลาดนัดจตุจักร',
            createdAt: '2024-12-10T09:15:00Z',
            updatedAt: '2024-12-15T16:00:00Z',
        },
    ]

    // สร้างข้อมูลยอดเงินตัวอย่าง
    const sampleBalances: UserBalance[] = [
        {
            userId: '1', // Provider 1
            balance: 2500,
            pendingEarnings: 1350,
            totalEarnings: 8500,
            totalSpent: 0,
            lastUpdated: new Date().toISOString(),
        },
        {
            userId: '2', // Provider 2
            balance: 1800,
            pendingEarnings: 810,
            totalEarnings: 6200,
            totalSpent: 0,
            lastUpdated: new Date().toISOString(),
        },
        {
            userId: '3', // Provider 3
            balance: 3200,
            pendingEarnings: 0,
            totalEarnings: 12400,
            totalSpent: 0,
            lastUpdated: new Date().toISOString(),
        },
        {
            userId: '4', // Customer
            balance: 5000,
            pendingEarnings: 0,
            totalEarnings: 0,
            totalSpent: 6600,
            lastUpdated: new Date().toISOString(),
        },
    ]

    // สร้างข้อมูลธุรกรรมตัวอย่าง
    const sampleTransactions: Transaction[] = [
        {
            id: '1',
            userId: '4',
            type: 'payment',
            amount: -3300,
            description: 'ชำระค่าบริการ - ถ่ายรูปและเดินเล่น',
            bookingId: '3',
            status: 'completed',
            createdAt: '2024-12-15T16:00:00Z',
        },
        {
            id: '2',
            userId: '3',
            type: 'earning',
            amount: 2970,
            description: 'รายได้จากการให้บริการ - ถ่ายรูปและเดินเล่น',
            bookingId: '3',
            status: 'completed',
            createdAt: '2024-12-15T16:00:00Z',
        },
        {
            id: '3',
            userId: '3',
            type: 'commission',
            amount: -330,
            description: 'ค่าคอมมิชชั่นแพลตฟอร์ม (10%) - ถ่ายรูปและเดินเล่น',
            bookingId: '3',
            status: 'completed',
            createdAt: '2024-12-15T16:00:00Z',
        },
    ]

    // บันทึกข้อมูลลง localStorage
    setUsers(sampleUsers)
    setServices(sampleServices)
    setReviews(sampleReviews)
    setBookings(sampleBookings)
    setBalances(sampleBalances)
    setTransactions(sampleTransactions)
}
