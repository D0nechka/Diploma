import ContentLoader, { IContentLoaderProps } from 'react-content-loader';
import cls from './style.module.scss';

const SkeletonMusicCard = (props: IContentLoaderProps) => (
    <div className={cls.skeletonCard}>
        <ContentLoader
            className={cls.content}
            speed={2}
            height={250}
            width={300}
            viewBox="0 0 250 300"
            backgroundColor="#727272"
            foregroundColor="#424243"
            {...props}
        >
            <rect x="0" y="25" rx="5" ry="5" width="200" height="170" />
            <rect x="0" y="229" rx="5" ry="5" width="225" height="18" />
            <rect x="0" y="266" rx="5" ry="5" width="225" height="18" />
        </ContentLoader>
    </div>
);

export { SkeletonMusicCard };