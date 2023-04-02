const handleDonateClick = async () => {
  try {
    // Código para chamar a função de doação do contrato inteligente
  } catch (e) {
    console.error(e);
    dispatch({ type: MetamaskActions.SetError, payload: e });
  }
};

const handleScheduleClick = async () => {
  try {
    // Código para chamar a função de agendamento do contrato inteligente
  } catch (e) {
    console.error(e);
    dispatch({ type: MetamaskActions.SetError, payload: e });
  }
};