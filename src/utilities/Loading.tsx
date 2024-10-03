function Loading() {
    return (
        <div style={{width: 'calc(100vw - 8px)', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '10px'}}>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' width='60' height='60'><linearGradient id='a11'><stop offset='0' stop-color='#FFFFFF' stop-opacity='0'></stop><stop offset='1' stop-color='#FFFFFF'></stop></linearGradient><circle fill='none' stroke='url(#a11)' stroke-width='30' stroke-linecap='round' stroke-dasharray='0 44 0 44 0 44 0 44 0 360' cx='100' cy='100' r='70' transform-origin='center'><animateTransform type='rotate' attributeName='transform' calcMode='discrete' dur='2' values='360;324;288;252;216;180;144;108;72;36' repeatCount='indefinite'></animateTransform></circle></svg>
            <h1 style={{color: 'white'}}>Carregando...</h1>
        </div>
    )
}

export default Loading