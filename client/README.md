# Comment 기능 구현

### Comment Delete

- localstorage에 저장된 userId와 comment.writer.\_id가 일치하면 `<EditComment>`를 출력한다.
- DeleteIcon 클릭시 MongoDB 내 해당 Comment model을 찾아 삭제하고 `<Comment>`를 리렌더링 한다.

### Comment Update

- localstorage에 저장된 userId와 comment.writer.\_id가 일치하면 `<EditComment>`를 출력한다.
- EditIcon 클릭시 MongoDB 내 해당 comment model을 찾아 수정하고 `<Comment>`를 리렌더링 한다.
