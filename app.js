import { useForm } from "@formspree/react";
import { useState } from "react";
import Field from "./Field";
import SuccessState from "./SuccessState";
import LockIcon from "./LockIcon";
import Spinner from "./Spinner";
import { PRESTATIONS } from "./constants.js";
import { buildWhatsAppURL } from "./emailService.js";

const INITIAL = { nom: "", tel: "", email: "", ville: "", prestation: "", desc: "" };

export default function DevisForm() {
    const [formspreeState, formspreeSubmit] = useForm("xnjlyryo");
    const [fields, setFields] = useState(INITIAL);
    const [errors, setErrors] = useState({});

    const set = (key) => (e) => setFields((p) => ({ ...p, [key]: e.target.value }));

    function validate() {
        const errs = {};

        if (!fields.nom.trim())
            errs.nom = "Ce champ est requis";
        else if (fields.nom.trim().length > 50)
            errs.nom = "50 caractères maximum";

        if (!fields.tel.trim())
            errs.tel = "Ce champ est requis";
        else if (!/^\d{10}$/.test(fields.tel.replace(/\s/g, "")))
            errs.tel = "Numéro invalide (10 chiffres)";

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
            errs.email = "Email invalide";
        else if (fields.email.length > 50)
            errs.email = "50 caractères maximum";

        if (!fields.ville.trim())
            errs.ville = "Ce champ est requis";
        else if (fields.ville.trim().length > 50)
            errs.ville = "50 caractères maximum";

        if (!fields.prestation)
            errs.prestation = "Veuillez sélectionner une prestation";

        if (fields.desc.length > 1000)
            errs.desc = "1000 caractères maximum";

        setErrors(errs);
        return Object.keys(errs).length === 0;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!validate()) return;
        await formspreeSubmit({
            nom:         fields.nom,
            telephone:   fields.tel,
            email:       fields.email,
            ville:       fields.ville,
            prestation:  fields.prestation,
            description: fields.desc || "Non précisée",
        });
        window.open(buildWhatsAppURL(fields), "_blank");
    }

    const inputBase   = "w-full bg-white/[0.04] border rounded-lg px-3.5 py-3 text-pbm-white font-dm text-sm outline-none transition-all duration-200 placeholder:text-pbm-grey focus:border-pbm-blue3/50 focus:bg-pbm-blue3/[0.06]";
    const inputError  = "border-red-500/60 bg-red-500/[0.04]";
    const inputNormal = "border-white/[0.09]";

    return (
        <section
            id="devis"
            className="relative bg-pbm-noir2 overflow-hidden px-6 py-24 md:px-16 lg:px-24"
        >
            <div
                className="pointer-events-none absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[700px] h-[350px]"
                style={{ background: "radial-gradient(ellipse, rgba(55,48,212,0.13) 0%, transparent 60%)" }}
            />

            <div className="relative z-10 mx-auto max-w-[660px] text-center">
                <div className="mb-4 inline-flex items-center gap-2.5">
                    <span className="block h-px w-6 bg-pbm-blue3" />
                    <span className="font-dm text-[10px] font-semibold uppercase tracking-[3px] text-pbm-blue3">
                        Contact
                    </span>
                </div>

                <h2 className="font-bebas text-[clamp(42px,6vw,68px)] leading-[0.95] tracking-wide text-pbm-white">
                    Devis{" "}
                    <span className="bg-gradient-to-r from-pbm-blue2 to-pbm-blue3 bg-clip-text text-transparent">
                        gratuit
                    </span>
                    <br />
                    sous 24 heures
                </h2>

                <p className="mt-3 font-dm text-sm font-light leading-relaxed text-pbm-grey2">
                    Décrivez votre projet. Nous vous recontactons rapidement pour organiser un déplacement gratuit.
                </p>

                <div
                    className="mt-11 rounded-[20px] border p-8 md:p-11 text-left"
                    style={{
                        background: "#13131f",
                        borderColor: "rgba(99,102,241,0.15)",
                        boxShadow: "0 40px 80px rgba(0,0,0,0.4)",
                    }}
                >
                    {formspreeState.succeeded ? (
                        <SuccessState />
                    ) : (
                        <form action="https://formspree.io/f/xnjlyryo" method="POST" onSubmit={handleSubmit} noValidate>
                            <div className="mb-3.5 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                                <Field label="Prénom & Nom" required error={errors.nom}>
                                    <input
                                        type="text"
                                        name="nom"
                                        placeholder="Jean Dupont"
                                        value={fields.nom}
                                        onChange={set("nom")}
                                        className={`${inputBase} ${errors.nom ? inputError : inputNormal}`}
                                        maxLength={50}
                                    />
                                </Field>
                                <Field label="Téléphone" required error={errors.tel}>
                                    <input
                                        type="tel"
                                        name="telephone"
                                        placeholder="06 XX XX XX XX"
                                        value={fields.tel}
                                        onChange={set("tel")}
                                        className={`${inputBase} ${errors.tel ? inputError : inputNormal}`}
                                        maxLength={10}
                                    />
                                </Field>
                            </div>

                            <div className="mb-3.5 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                                <Field label="Email" required error={errors.email}>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="votre@email.fr"
                                        value={fields.email}
                                        onChange={set("email")}
                                        className={`${inputBase} ${errors.email ? inputError : inputNormal}`}
                                        maxLength={50}
                                    />
                                </Field>
                                <Field label="Ville" required error={errors.ville}>
                                    <input
                                        type="text"
                                        name="ville"
                                        placeholder="Cergy, Gonesse, Paris…"
                                        value={fields.ville}
                                        onChange={set("ville")}
                                        className={`${inputBase} ${errors.ville ? inputError : inputNormal}`}
                                        maxLength={50}
                                    />
                                </Field>
                            </div>

                            <div className="mb-3.5">
                                <Field label="Type de prestation" required error={errors.prestation}>
                                    <select
                                        name="prestation"
                                        value={fields.prestation}
                                        onChange={set("prestation")}
                                        className={`${inputBase} cursor-pointer appearance-none ${errors.prestation ? inputError : inputNormal} ${!fields.prestation ? "text-pbm-grey" : "text-pbm-white"}`}
                                        style={{
                                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236b6b7e' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "right 14px center",
                                            paddingRight: "36px",
                                        }}
                                    >
                                        <option value="">Sélectionnez une prestation</option>
                                        {PRESTATIONS.map((p) => (
                                            <option key={p} value={p} style={{ background: "#13131f" }}>{p}</option>
                                        ))}
                                    </select>
                                </Field>
                            </div>

                            <div className="mb-3.5">
                                <Field label="Description du projet">
                                    <textarea
                                        name="description"
                                        rows={4}
                                        placeholder="Décrivez votre projet, les dimensions si vous les connaissez, vos contraintes…"
                                        value={fields.desc}
                                        onChange={set("desc")}
                                        className={`${inputBase} resize-none ${inputNormal}`}
                                        maxLength={1000}
                                    />
                                </Field>
                            </div>

                            <button
                                type="submit"
                                disabled={formspreeState.submitting}
                                className="mt-2 flex w-full items-center justify-center gap-2 rounded-[10px] py-4 font-dm text-[15px] font-medium text-white transition-all duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                                style={{
                                    background: "linear-gradient(135deg, #3730d4, #4f46e5)",
                                    boxShadow: "0 8px 28px rgba(55,48,212,0.35)",
                                }}
                            >
                                {formspreeState.submitting ? (
                                    <><Spinner /> Envoi en cours…</>
                                ) : (
                                    "Envoyer ma demande de devis →"
                                )}
                            </button>

                            <p className="mt-3.5 flex items-center justify-center gap-1.5 font-dm text-[11px] text-pbm-grey">
                                <LockIcon />
                                Déplacement gratuit · Réponse sous 24h · Sans engagement
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}