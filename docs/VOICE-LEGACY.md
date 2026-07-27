# Voice Legacy: Adding Original Family Audio

Voice Legacy uses clearly labeled synthesized Kannada narration by default.
When your parents' recordings are ready, the existing capsule can be upgraded
without rewriting its text or replacing its family link.

## Prepare the recording

- Record in a quiet room with the phone 15–25 cm from the speaker.
- Ask the speaker to say the capsule text naturally in Kannada.
- Keep each clip under 2 minutes and 15 MB.
- Use WAV, M4A, MP3, or WebM audio.
- Keep the unedited master file outside the app as a family backup.

## Attach it

1. Open **Roots → Voice Legacy** on the device that should hold the archive.
2. Find the existing capsule.
3. Choose **Add original voice**.
4. Select the consented audio file.
5. Reload once and confirm the button says **Play original voice**.

You can also choose **Original family recording** while creating a new capsule,
then record with the microphone or upload a file.

## Privacy boundary

- Signed-out text capsules are stored in `localStorage`; signed-in capsules also
  sync to that user's RLS-protected Supabase archive.
- Original audio is stored in IndexedDB first. When signed in, it also uploads
  to that user's private Supabase Storage folder for cross-device playback.
- A **Family link** contains only the displayed capsule text, name, place, and
  date. The recipient hears synthesized narration.
- Community Memory Wall contributions are published separately and never expose
  a private Voice Legacy recording.

This boundary is deliberate. Cross-device audio uses authenticated object
storage, user-scoped policies, explicit speaker consent, and short-lived signed
URLs. Do not describe the family share link as carrying the original recording.

## Consent checklist

- The speaker knows the recording is being preserved.
- The speaker approves the exact sharing level.
- The family has permission to use names and locations shown in the capsule.
- A family member retains the original file and can request deletion.
- Synthesized narration is never described as the speaker's real voice.