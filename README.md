# 모임 관리 플랫폼 Eventory : Back-End 강의용 프로젝트 for Junior
본 프로젝트는 GDG on Campus Korea University에서 진행되는 Junior 멤버 대상 BE 강의자료로 사용되는 프로젝트입니다.  
매 주 강의에서 다룰 코드는 사전에 업데이트 될 예정이며, **모든 수강생은 본 레포지토리를 포크하거나, 별도의 레포지토리를 생성해주세요.**

## 안내사항
1. 본 레포지토리는 강의용 레포지토리입니다. 직접 PR이나 Issue를 생성하지 말아주세요.
2. Issue와 PR에서 closed된 항목들을 확인해주세요. 본 레포지토리 코드에 대한 히스토리, 설명을 확인할 수 있습니다.
3. 최종 과제는 5주차 수업에서 공개되며 세부사항은 Issue로 발행합니다.
4. HW 코드는 5주차 수업 이후부터 6주차 수업 전까지 순차적으로 업로드 될 예정입니다.


## Spec

모임 관리 플랫폼 Eventory는 아래와 같은 기능을 포함합니다.      
**아래의 Spec은 향후 변경될 가능성이 있습니다.**

- 유저
    - email, pw 기반으로 가입할 수 있습니다.
    - 이름은 필수 입력 정보입니다.
    - 거주 지역과 생년월일은 선택 입력 정보입니다.
- 모임
    - 유저는 모임을 생성할 수 있습니다. 해당 모임의 호스트가 됩니다.
    - 모임에는 다른 유저들이 참여할 수 있습니다.
    - 모임은 아래 정보를 포함합니다.
        - 제목
        - 내용
        - 호스트
        - 카테고리
        - 지역
        - 시작 시각
        - 종료 시각
        - 최대 정원 (정원에는 호스트도 포함합니다)
    - 모임은 시작 전/진행 중/종료의 3단계의 상태를 가집니다.
    - 모임의 수정/삭제는 시작 전까지만 호스트에 의해 가능합니다. 단, 참석자를 쫒아낼 수는 없습니다.
    - 모임 시작 전까지만 참가, 탈퇴가 가능합니다.
- 리뷰
    - 모임이 끝나면 참여자들은 리뷰를 작성할 수 있습니다.
    - 리뷰는 유저 당 하나만 남길 수 있습니다.
    - 리뷰는 아래의 정보를 포함합니다.
        - 제목
        - 내용 (선택)
        - 평점 (1~5 사이의 정수)
    - 리뷰의 수정/삭제는 작성자만 할 수 있습니다.
- 지역
    - 지역은 특별시/광역시/도 - 시/군/구의 2단계로 구성됩니다.
- 카테고리
    - 카테고리는 총 30가지이며, 유저가 별도로 추가/수정/삭제할 수 없습니다.

## API List
수업 및 과제에서 구현할 API List입니다.
각 API에 대한 상세한 Spec은 해당 주차에 Issue로 발행할 예정입니다.  
링크를 통해 해당 Issue로 이동할 수 있습니다.

- Auth 
    - POST /sign-up **(Week5)**
    - POST /login **(Week5)**
    - POST /refresh **(Week5)**
- User
    - GET /me **(Week5-HW)**
    - GET /:userId **(Week5-HW)** 
    - DELETE /:userId [**(Week3)**](https://github.com/worjs/nest-study-eventory/issues/32)
- Event
    - GET / [**(Week2-HW)**](https://github.com/worjs/nest-study-eventory/issues/17)
    - GET /me **(Week5-HW)**
    - GET /:eventId [**(Week2-HW)**](https://github.com/worjs/nest-study-eventory/issues/16)
    - POST / [**(Week2-HW)**](https://github.com/worjs/nest-study-eventory/issues/14)
    - PUT or PATCH /:eventId [**(Week3-HW)**](https://github.com/worjs/nest-study-eventory/issues/33)
    - DELETE /:eventId [**(Week3-HW)**](https://github.com/worjs/nest-study-eventory/issues/34)
    - POST /:eventId/join [**(Week2-HW)**](https://github.com/worjs/nest-study-eventory/issues/18)
    - POST /:eventId/out [**(Week2-HW)**](https://github.com/worjs/nest-study-eventory/issues/19)
    - **(필수)** User Soft Delete에 따른 Repository 구현 변경 [**(Week3-HW)**](https://github.com/worjs/nest-study-eventory/issues/36)
- Review
    - GET / [**(Week2)**](https://github.com/worjs/nest-study-eventory/issues/12)
    - GET /:reviewId [**(Week2)**](https://github.com/worjs/nest-study-eventory/issues/11)
    - POST / [**(Week2)**](https://github.com/worjs/nest-study-eventory/issues/10)
    - PUT /:reviewId [**(Week3)**](https://github.com/worjs/nest-study-eventory/issues/28)
    - PATCH /:reviewId [**(Week3)**](https://github.com/worjs/nest-study-eventory/issues/29)
    - DELETE /:reviewId [**(Week3)**](https://github.com/worjs/nest-study-eventory/issues/30)
- Region 
    - GET / [**(Week1)**](https://github.com/worjs/nest-study-eventory/issues/6)
      [**(Week2-HW)**](https://github.com/worjs/nest-study-eventory/issues/9)
- Category 
    - GET / [**(Week1-HW)**](https://github.com/worjs/nest-study-eventory/issues/7)

## 추가 Exercise
아래는 과제 외로 추가로 구현할만한 과제들입니다. 실제 요구사항이 주어져 코드를 변경해야 하는 상황을 가정합니다.
- [**모임 생성, 수정, 상세조회 시 더 자세한 정보를 리턴하도록 변경**](https://github.com/worjs/nest-study-eventory/issues/15)


## DB Schema
아래는 Week3 기준 DB 스키마입니다. 역시 변경 가능성이 있습니다.
![image](https://github.com/user-attachments/assets/32b8ca39-7759-4a2e-be13-0c50dfcaea5f)


