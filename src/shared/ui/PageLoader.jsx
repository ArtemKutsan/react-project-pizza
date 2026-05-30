import cls from './PageLoader.module.css';

export const PageLoader = () => {
  return (
    <div className={cls.loaderWrap}>
      <span className={cls.loader} />
    </div>
  );
};
