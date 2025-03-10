export const getIsDisposableEmail = async (email: string) => {
  const { disposable } = await fetch(
    `https://open.kickbox.com/v1/disposable/${email}`,
  ).then((res) => res.json());

  return disposable;
};
