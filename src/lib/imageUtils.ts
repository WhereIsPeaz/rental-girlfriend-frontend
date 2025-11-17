// Image utility functions for base64 conversion and handling

export interface ImageUploadResult {
    base64: string
    fileName: string
    fileSize: number
    mimeType: string
}

/**
 * Convert a File object to base64 string
 */
export const fileToBase64 = (file: File): Promise<ImageUploadResult> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()

        reader.onload = () => {
            const result = reader.result as string
            resolve({
                base64: result,
                fileName: file.name,
                fileSize: file.size,
                mimeType: file.type,
            })
        }

        reader.onerror = () => {
            reject(new Error('Failed to read file'))
        }

        reader.readAsDataURL(file)
    })
}

/**
 * Validate image file before upload
 */
export const validateImageFile = (
    file: File
): { isValid: boolean; error?: string } => {
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
        return {
            isValid: false,
            error: 'รองรับเฉพาะไฟล์ JPG, PNG และ WebP เท่านั้น',
        }
    }

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB in bytes
    if (file.size > maxSize) {
        return {
            isValid: false,
            error: 'ขนาดไฟล์ต้องไม่เกิน 5MB',
        }
    }

    return { isValid: true }
}

/**
 * Resize image to fit within max dimensions while maintaining aspect ratio
 */
export const resizeImage = (
    file: File,
    maxWidth = 800,
    maxHeight = 600,
    quality = 0.8
): Promise<string> => {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        const img = new Image()

        img.onload = () => {
            // Calculate new dimensions
            let { width, height } = img

            if (width > height) {
                if (width > maxWidth) {
                    height = (height * maxWidth) / width
                    width = maxWidth
                }
            } else {
                if (height > maxHeight) {
                    width = (width * maxHeight) / height
                    height = maxHeight
                }
            }

            // Set canvas dimensions
            canvas.width = width
            canvas.height = height

            // Draw resized image
            ctx?.drawImage(img, 0, 0, width, height)

            // Convert to base64
            const base64 = canvas.toDataURL(file.type, quality)
            resolve(base64)
        }

        img.onerror = () => {
            reject(new Error('Failed to load image'))
        }

        img.src = URL.createObjectURL(file)
    })
}

/**
 * Process image file: validate, resize, and convert to base64
 */
export const processImageFile = async (
    file: File,
    options: {
        maxWidth?: number
        maxHeight?: number
        quality?: number
        resize?: boolean
    } = {}
): Promise<ImageUploadResult> => {
    const {
        maxWidth = 800,
        maxHeight = 600,
        quality = 0.8,
        resize = true,
    } = options

    // Validate file
    const validation = validateImageFile(file)
    if (!validation.isValid) {
        throw new Error(validation.error)
    }

    let base64: string

    if (resize) {
        // Resize and convert to base64
        base64 = await resizeImage(file, maxWidth, maxHeight, quality)
    } else {
        // Just convert to base64 without resizing
        const result = await fileToBase64(file)
        base64 = result.base64
    }

    return {
        base64,
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type,
    }
}

/**
 * Create a preview URL from base64 string
 */
export const createPreviewUrl = (base64: string): string => {
    return base64
}

/**
 * Check if a string is a valid base64 image data URI
 */
export const isBase64Image = (str: string | undefined): boolean => {
    if (!str || str.trim() === '') {
        return false
    }
    return str.trim().startsWith('data:image/')
}

/**
 * Normalize image path to ensure it starts with / or is an absolute URL
 * Handles base64 data URIs, paths, and empty strings
 */
export const normalizeImagePath = (
    imagePath: string | undefined,
    fallback = '/img/p1.jpg'
): string => {
    // If undefined, null, or empty string, use fallback
    if (!imagePath || imagePath.trim() === '') {
        return fallback
    }

    const img = imagePath.trim()

    // If it's a base64 data URI, return as is
    if (img.startsWith('data:')) {
        return img
    }

    // If it's an absolute URL, return as is
    if (img.startsWith('http://') || img.startsWith('https://')) {
        return img
    }

    // If it starts with /, return as is
    if (img.startsWith('/')) {
        return img
    }

    // Otherwise, add leading slash (for relative paths)
    return `/${img}`
}

/**
 * Get file size from base64 string (approximate)
 */
export const getBase64FileSize = (base64: string): number => {
    // Remove data URL prefix
    const base64Data = base64.split(',')[1] ?? base64

    // Calculate approximate file size
    const padding = base64Data.endsWith('==')
        ? 2
        : base64Data.endsWith('=')
          ? 1
          : 0
    return (base64Data.length * 3) / 4 - padding
}

/**
 * Compress base64 image if it's too large
 */
export const compressBase64Image = (
    base64: string,
    maxSizeKB = 500
): Promise<string> => {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        const img = new Image()

        img.onload = () => {
            canvas.width = img.width
            canvas.height = img.height
            ctx?.drawImage(img, 0, 0)

            let quality = 0.8
            let compressedBase64 = canvas.toDataURL('image/jpeg', quality)

            // Reduce quality until file size is acceptable
            while (
                getBase64FileSize(compressedBase64) > maxSizeKB * 1024 &&
                quality > 0.1
            ) {
                quality -= 0.1
                compressedBase64 = canvas.toDataURL('image/jpeg', quality)
            }

            resolve(compressedBase64)
        }

        img.onerror = () => {
            reject(new Error('Failed to compress image'))
        }

        img.src = base64
    })
}
