# wallet-coin-send
ethers.js를 이용하여 개인지갑 코인 송금을 편리하게 합니다.

최적화된 수수료 경로로 수수료는 최소화, 속도는 빠르게!

## 주요 기능
- 코인(USDT BEP20) 지갑 현재 잔액 확인 기능
- USDT BEP20 코인 송금 기능
- 현재 상황에서 최적화된 수수료 경로를 자동으로 잡아 수수료는 최소화, 속도는 빠르게!

## 사용 방법
1. 이 프로젝트를 클론하거나 다운로드하세요.
2. 터미널에 npm install을 입력하여 패키지를 다운받으세요.
3. .env 파일을 만드세요.
4. PRIVATE_KEY = "본인지갑 프라이빗 키"
   INFURA_API_KEY = "INFURA 서비스 API 키"
   를 입력하세요.
5. (coinsend.js를 이용할 경우)
   coinsend.js에서 const RECIPIENT_ADDRESS = ''; 
   const AMOUNT = 0; 를 RECIPENT_ADDRESS는 보낼 주소, AMOUNT는 보낼 코인 수량으로 입력하세요.
6. node balance.js, node coinsend.js 로 프로그램을 실행하세요.

본 프로젝트는 USDT BEP20을 지원합니다.
