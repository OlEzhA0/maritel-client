import React, { useState } from "react";
import "./SubscribeByMail.scss";
import { useMutation } from "react-apollo";
import { addSubscribeMutation } from "../../helpers";
import cn from "classnames";
// eslint-disable-next-line
const EMAIL_REGEXP = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

export const SubscribeByMail = () => {
  const [addSubscribe] = useMutation(addSubscribeMutation);
  const [isAgreeWithRules, setIsAgreeWithRules] = useState(false);
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const addSubs = async () => {
    if (EMAIL_REGEXP.test(email) && isAgreeWithRules) {
      await addSubscribe({ variables: { email } }).then(() => {
        setIsAgreeWithRules(false);
        setEmail("");
        setSuccess(true);
        setTimeout(() => setSuccess(false), 1500);
      });
    } else {
      setError(true);
    }
  };

  return (
    <div className="SubscribeByMail__Invite">
      <div className="SubscribeByMail__Info">
        <h1 className="SubscribeByMail__Title">ПРИГЛАШАЕМ В MARITEL КЛУБ</h1>
        <p className="SubscribeByMail__Discount">
          Скидка -20% на все товары для новых участников
        </p>
      </div>
      <form
        className="SubscribeByMail__Form"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="SubscribeByMail__FormWrap">
          <label htmlFor="inputSubs"></label>
          <input
            id="inputSubs"
            type="text"
            className={cn({
              SubscribeByMail__InputInvite: true,
              "SubscribeByMail__InputInvite--success": success,
            })}
            placeholder="Ваш e-mail"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(false);
            }}
          />
          <button
            className="SubscribeByMail__ButtonInvite"
            type="submit"
            onClick={addSubs}
            disabled={error}
          >
            подписаться
          </button>
        </div>
        <label className="SubscribeByMail__Privacy">
          <input
            type="checkbox"
            className="SubscribeByMail__InviteCheckbox"
            checked={isAgreeWithRules}
            onChange={(e) => {
              setIsAgreeWithRules(e.target.checked);
              setError(false);
            }}
          />
          <p className="SubscribeByMail__PrivacyText">
            Я соглашаюсь с политикой конфиденциальности
          </p>
        </label>
      </form>
    </div>
  );
};
