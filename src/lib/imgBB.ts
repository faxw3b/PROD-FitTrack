import { IMGBB_API_KEY, IMGBB_API_URL } from '@/constants/constants';

export const uploadToImgBB = async (files: FileList | undefined): Promise<string> => {
  if (files === undefined) throw new Error('Выберите файл');

  const formData = new FormData();
  formData.append('image', files[0]);
  formData.append('key', IMGBB_API_KEY);

  const response = await fetch(`${IMGBB_API_URL}/1/upload`, {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  if (!data.success) throw new Error('Ошибка загрузки изображения');
  return data.data.url;
};
