import styles from "./UsersTable.module.css";

function UserRow({
  user,
  stateDeleteGroupUsers,
  onEdit,
  onDelete,
  handleCheck,
}) {
  return (
    <tr className={styles.tr}>
      <td className={styles.td}>{`${user.firstName} ${user.lastName}`}</td>
      <td className={styles.td}>{user.email}</td>
      <td className={`${styles.td} ${styles.tdActions}`}>
        {stateDeleteGroupUsers.IsDeleteGroup ? (
          <>
            <input
              type="checkbox"
              id={`checkbox-${user.id}`}
              onClick={()=>handleCheck(user.id)}
            />
            <label
              className={`
                ${
                  stateDeleteGroupUsers.usersIds.includes(user.id)
                    ? styles.labelChecked
                    : ""
                }
              `}
              htmlFor={`checkbox-${user.id}`}
            ></label>
          </>
        ) : (
          <>
            <button className={styles.buttonEdit} onClick={onEdit}>
              ویرایش
            </button>

            <button
              className={styles.buttonDelete}
              onClick={onDelete}
            >
              حذف
            </button>
          </>
        )}
      </td>
    </tr>
  );
}

export default UserRow;
