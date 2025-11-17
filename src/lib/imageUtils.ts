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
 * Validate base64 image string matches backend requirements
 * Returns validation result with error message if invalid
 */
export const validateBase64Image = (
    base64: string
): { valid: boolean; error?: string } => {
    if (!base64 || typeof base64 !== 'string') {
        return { valid: false, error: 'Image must be a non-empty string' }
    }

    const trimmed = base64.trim()

    // Check data URI format: data:image/[type];base64,[base64data]
    const dataUriRegex =
        /^data:(image\/[a-zA-Z0-9.+-]+);base64,([A-Za-z0-9+/=]+)$/
    const match = dataUriRegex.exec(trimmed)

    if (!match) {
        return {
            valid: false,
            error: 'Invalid base64 format. Must be: data:image/[type];base64,[data]',
        }
    }

    const mimeType = match[1]!.toLowerCase()
    const base64Data = match[2]!

    // Check allowed mime types
    const allowedTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/webp']
    const normalizedMimeType =
        mimeType === 'image/jpg' ? 'image/jpeg' : mimeType

    if (!allowedTypes.includes(normalizedMimeType)) {
        return {
            valid: false,
            error: `Unsupported image type: ${mimeType}. Allowed: png, jpeg, gif, webp`,
        }
    }

    // Check base64 string is not empty
    if (!base64Data || base64Data.length === 0) {
        return { valid: false, error: 'Base64 data is empty' }
    }

    // Estimate size (max 5MB)
    const padding = base64Data.endsWith('==')
        ? 2
        : base64Data.endsWith('=')
          ? 1
          : 0
    const approxBytes = Math.floor((base64Data.length * 3) / 4) - padding
    const maxBytes = 5 * 1024 * 1024 // 5MB

    if (approxBytes > maxBytes) {
        return {
            valid: false,
            error: `Image too large: ${Math.round(approxBytes / 1024 / 1024)}MB. Max: 5MB`,
        }
    }

    return { valid: true }
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

/**
 * Convert an image URL/path to base64 data URI
 * Useful for converting local image paths to base64 before sending to backend
 * Uses fetch to avoid CORS issues with local images
 */
export const imageUrlToBase64 = async (
    imageUrl: string,
    options: {
        maxWidth?: number
        maxHeight?: number
        quality?: number
    } = {}
): Promise<string> => {
    const { maxWidth = 400, maxHeight = 400, quality = 0.8 } = options

    try {
        // Fetch the image
        const response = await fetch(imageUrl)
        if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.statusText}`)
        }

        // Convert to blob
        const blob = await response.blob()

        // Create image element to get dimensions
        const img = new Image()
        const imageLoadPromise = new Promise<HTMLImageElement>(
            (resolve, reject) => {
                img.onload = () => resolve(img)
                img.onerror = () =>
                    reject(new Error('Failed to load image for processing'))
            }
        )

        img.src = URL.createObjectURL(blob)
        await imageLoadPromise

        // Create canvas for resizing
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        if (!ctx) {
            throw new Error('Failed to get canvas context')
        }

        // Calculate new dimensions while maintaining aspect ratio
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
        ctx.drawImage(img, 0, 0, width, height)

        // Clean up
        URL.revokeObjectURL(img.src)

        // Convert to base64 with proper mime type detection
        // Force JPEG for consistency and better compatibility
        const base64Raw = canvas.toDataURL('image/jpeg', quality)

        // Validate format matches backend requirements:
        // data:image/[type];base64,[base64string with A-Za-z0-9+/=]
        const base64Regex =
            /^data:(image\/[a-zA-Z0-9.+-]+);base64,([A-Za-z0-9+/=\s]+)$/
        if (!base64Regex.test(base64Raw)) {
            throw new Error('Generated base64 does not match required format')
        }

        // Clean whitespace from base64 data (remove any spaces/newlines)
        const base64Clean = base64Raw.replace(/\s+/g, '')

        return base64Clean
    } catch (error) {
        throw new Error(
            `Failed to convert image to base64: ${error instanceof Error ? error.message : 'Unknown error'}`
        )
    }
}
