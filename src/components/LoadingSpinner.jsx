import { motion } from 'framer-motion';

const sizeMap = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
};

const LoadingSpinner = ({ size = 'md' }) => {
    return (
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className={`${sizeMap[size]} border-4 border-purple-300 border-t-purple-600 rounded-full`}
        />
    );
};

export default LoadingSpinner;
