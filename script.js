
// 안에 들어가는 유령 svg 들에 마우스의 방향을 쳐다보는 이벤트 추가
const svgElements = document.querySelectorAll('.G_body');
const groupMovementRadius = 10; // g 그룹의 이동 반경

// 마우스가 움직이면 이벤트 실행 >
document.addEventListener('mousemove', (event) => {
    // svgElements svg 요소 중 .eyes 를 선택해서 >
    svgElements.forEach((svg) => {
        const eyesGroup = svg.querySelector('.eyes');
        const svgRect = svg.getBoundingClientRect(); // 좌표 정보를 위해 svg 의 위치, 크기를 가져오고
        const eyeGroupCenter = { x: svgRect.width / 2, y: 75.6122 }; // 중심 지정

        // 마우스 x, y 좌표 변환
        const mouseX = event.clientX - svgRect.left;
        const mouseY = event.clientY - svgRect.top;

        // .eyes 에서 지정해 준 중심이랑 마우스의 x, y 축을 계산
        const deltaX = mouseX - eyeGroupCenter.x;
        const deltaY = mouseY - eyeGroupCenter.y;
        const angle = Math.atan2(deltaY, deltaX); // + 각도 계산

        const distance = Math.min(groupMovementRadius, Math.sqrt(deltaX * deltaX + deltaY * deltaY)); // 최대 거리 제한
        // 새로운 x, y 축 좌표를 계산해서 >
        const newX = Math.cos(angle) * distance;
        const newY = Math.sin(angle) * distance;

        // 그 계산된 좌표를 사용해 유령의 눈이 마우스를 바라보는것처럼 하게 함
        eyesGroup.setAttribute('transform', `translate(${newX}, ${newY})`);
    });
});


// 클릭하면 up 애니메이션을 실행시키는 이벤트 추가
// 애니메이션을 넣을 개체 선언 ghosts
const MGhosts = document.querySelectorAll('.main_1G, .main_2G, .main_3G, .main_4G');
const AGhosts1 = document.querySelectorAll('.about_me_1G,.about_me_2G');

// ghosts 에 클릭 이벤트를 추가하여 > 클릭 시 up 클래스를 토글
MGhosts.forEach(ghost => {
    ghost.addEventListener('click', () => {
        ghost.classList.toggle('up');

        // 애니메이션이 끝났을 때 클릭하지 않아도 바로 'up' 클래스를 제거할 수 있도록 이벤트 추가
        ghost.addEventListener('animationend', () => {
            ghost.classList.remove('up');
        }, { once: true }); // 애니메이션이 한번씩 실행될 수 있도록 합니다.
    });
});

AGhosts1.forEach(ghost => {
    ghost.addEventListener('click', () => {
        // hide 와 eEvent 클래스를 동시에 추가
        ghost.classList.toggle('hide');
        const eyes = ghost.querySelectorAll('.eyeEvent');
        eyes.forEach(eye => eye.classList.toggle('eEvent'));

        // 2초 후에 클래스 제거
        setTimeout(() => {
            ghost.classList.remove('hide');
            eyes.forEach(eye => eye.classList.remove('eEvent'));
        }, 2000); // 2000ms = 2초
    });
});